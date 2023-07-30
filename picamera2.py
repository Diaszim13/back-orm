from picamera2 import Picamera2, Preview
import time

Picamera2 = Picamera2();

camera_cofg = Picamera2.create_preview_configuration();
Picamera2.configure(camera_cofg);
Picamera2.start_prevview(Preview.QTGL);
Picamera2.start();
time.sleep(1);


Picamera2.capture_file("./src/images/teste/");
