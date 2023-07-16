import * as tf from '@tensorflow/tfjs';
import { load } from '@tensorflow-models/mobilenet';
import { create, KNNClassifier } from '@tensorflow-models/knn-classifier';
import * as jimp from 'jimp';

async function loadImage(path: string): Promise<any> {
  const image = await jimp.read(path);
  image.resize(224, 224);
  const numChannels = 3; // RGB image
  const imageData = new Uint8Array(image.bitmap.data);
  const tensor = tf.tensor3d(imageData, [image.bitmap.height, image.bitmap.width, numChannels], 'float32');
  return tensor.div(255).expandDims(0) as tf.Tensor<tf.Rank>;
}

async function compareImages(imagePath1: string, imagePath2: string): Promise<number> {
  const mobilenet = await load();
  const classifier = create();

  const image1 = await loadImage(imagePath1);
  const image2 = await loadImage(imagePath2);

  const embedding1 = tf.tensor2d(await mobilenet.infer(image1).data(), [1, 1000]);
  const embedding2 = tf.tensor2d(await mobilenet.infer(image2).data(), [1, 1000]);

  await classifier.addExample(embedding1, 'image1');
  await classifier.addExample(embedding2, 'image2');

  const embeddings = classifier.getClassifierDataset();
  const numClasses = Object.keys(embeddings).length;

  const labels = ['image1', 'image2'];
  classifier.setClassifierDataset(embeddings, numClasses, labels);

  const result = await classifier.predictClass(tf.sub(embedding1, embedding2) as tf.Tensor<tf.Rank>);
  const similarity = 1 - result.confidences[result.label];
  return similarity;
}

compareImages('image1.jpg', 'image2.jpg').then(similarity => {
  console.log(`Similarity: ${similarity}`);
});
