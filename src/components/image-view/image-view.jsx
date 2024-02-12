import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ImageCard } from '../image-card/image-card';

export const ImageView = (token) => {
  const [images, setImages] = useState([]);

  //upload an image to the S3 Bucket using the /images endpoint in the API
  async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    const modifiedFileName = `original-images/${file.name}`;
    console.log("modifiedFileName is: " + modifiedFileName);
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.SERVER_CONNECTION_URL}/imagesupload`, {
        method: "POST",
        body: formData,
        //headers: { "Content-Type": "multipart/form-data", }
      });

      if(response.ok) {
        const result = await response.json();
        console.log('Image uploaded successfully. Image URL: ', result.imageUrl);
        alert("Image uploaded successfully!");
      } else {
        console.error('Error uploading image: ', response.statusText);
      }
    } catch (error) {
      console.error("An Error occurred", error);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    //this must be changed to only end through the file names from within the resized-images folder
    fetch(`${process.env.SERVER_CONNECTION_URL}/imageslist`)
      .then((response) => response.json())
      .then((data) => {
        const imagesFromApi = data.Contents.map(({Key}) => (Key)) //takes the keys from the list of images and creates an array of only image names
        const resizedImages = imagesFromApi.filter((x) => x.includes('resized-images/')); //only take the images in the resized-images/ S3 folder
        resizedImages.shift(); //remove the first entry in the list, which is simply the resized-images/ folder itself
        const resizedImageNames = resizedImages.map((x) => x.replace('resized-images/', '')); //remove the folder prefix from the list of images.
        setImages(resizedImageNames);
      }); 
  }, [token, setImages]); 

  return (
    <>
      <Row>
        <input type="file" id="fileInput" name='file' />
        <Button onClick={uploadImage}>Upload a movie screenshot!</Button>
      </Row>
      <Row className="m-3">
        {images.length === 0 ? (
          <Col>The list of images is empty!</Col>
        ) : (
          images.map((image) => ( //filteredMovies needs to be changed into an array of objects that come from GetObject using imagesFromApi
            <Col className="mb-4" lg={3} md={4} sm={6} > 
              <ImageCard image={image} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}