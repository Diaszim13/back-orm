import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.preprocessing import image
import numpy as np
import os


# Carregando o modelo MobileNet pré-treinado
base_model = MobileNetV2(weights='imagenet', include_top=False)

# Função para extrair recursos das imagens
def extract_features(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)
    features = base_model.predict(img)
    features = np.reshape(features, (features.shape[1], features.shape[2], features.shape[3]))
    return features

# Extrair recursos das imagens de referência
reference_image_path = './src/images/boa/'
reference_features = []
for image_file in os.listdir(reference_image_path):
    image_path = os.path.join(reference_image_path, image_file)
    features = extract_features(image_path)
    reference_features.append(features)

# Extrair recursos das imagens a serem comparadas
test_image_path = './src/images/teste/'
for image_file in os.listdir(test_image_path):
    image_path_test = os.path.join(test_image_path, image_file)
    test_features = extract_features(image_path_test)

# Comparar as imagens usando alguma métrica (por exemplo, distância euclidiana)
distances = []
for ref_features in reference_features:
    distance = np.linalg.norm(ref_features - test_features)
    distances.append(distance)

# Resultados
min_distance_index = np.argmin(distances)
min_distance_image = os.listdir(reference_image_path)[min_distance_index]
print("Imagem mais semelhante:", min_distance_image)
