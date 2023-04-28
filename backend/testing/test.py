import requests
import os

url = "http://localhost:3000/upload"
image_path = "image1.jpg"
product_id = "6438ceeace2b67e3ee771be1"

# Read the image file
with open(image_path, "rb") as image_file:
    image_data = image_file.read()

# Prepare the POST request
files = {"image": (os.path.basename(image_path), image_data, "image/jpeg")}
data = {"imgName": "image2.jpg", "productId": product_id}
params = {"filename": "image2"}

# Send the POST request
response = requests.post(url, files=files, data=data, params=params)

# Check the response
if response.status_code == 200:
    print("Image uploaded successfully!")
    print(response.json())
else:
    print(f"Error uploading image: {response.status_code}")
    print(response.text)
