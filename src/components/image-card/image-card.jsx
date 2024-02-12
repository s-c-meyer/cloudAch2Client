import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap"

export const ImageCard = ({ image }) => {
  const [actualImage, setActualImage] = useState('');

  const handleDownloadClick = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_CONNECTION_URL}/images/open/original-images%2F${image}`); //should also change this to only download from the 'original-images/' folder in S3, because we want to download the original and not the thumbnail

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        //create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = `${image}`;
        document.body.appendChild(link);

        //trigger the click event to start the download
        link.click();

        document.body.removeChild(link);
      } else {
        console.error('Error downloading the image');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.SERVER_CONNECTION_URL}/images/resized-images%2F${image}`); //once I have setup the lambda function, simply change the ${image} to include the prefix of whatever folder the edited photos go in, edited-images/${image}

        if(!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setActualImage(imageUrl);
      } catch (error) {
        console.error('Error fetching image: ', error);
      }
    };

    fetchData();
  }, []); //empty dependency array ensures that this effect runs once

  return (
    <>
      <Card bg="secondary" className="h-100">
        <Card.Img className="card-img" variant="top" src={actualImage} />
        <Card.Body className="text-center d-flex flex-column justify-content-between">
          <Button className="button-text" variant="link" onClick={handleDownloadClick}>Download Full-Size Image</Button>
        </Card.Body>
      </Card>
    </>
    
  )
}