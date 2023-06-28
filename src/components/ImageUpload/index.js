import React, { useState } from 'react';


const ImageUploadForm = ({ sessionKey }) => {
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('session_key', sessionKey);
      formData.append('image_upload', selectedImage);
      formData.append('msg', 'test')
      

      try {
        const uploadResponse = await fetch('https://api.eazibots.com/api/response/', {
          method: 'POST',
          headers:{
             //"Content-Type": "multipart/form-data",
          },
          body: formData,
        });
        
        const responseData = await uploadResponse.json()
        console.log(responseData)

        if (uploadResponse.ok) {
          console.log(uploadResponse);
          // Handle successful image upload
        } else {
          console.error('Error uploading the image.');
          // Handle error uploading the image
        }
      } catch (error) {
        console.error('Error uploading the image.', error);
        // Handle any network or other errors
      }
    } else {
      console.error('No image selected.');
      // Handle the case when no image is selected
    }
  };

  const handleChatbotProgress = async () => {
    // Code to progress the chatbot conversation to a different endpoint
    try {
      const progressResponse = await fetch("https://api.eazibots.com/api/response/", {
        method: 'POST',
        body: JSON.stringify({ session_key: sessionKey , msg: 'Progress chat'}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (progressResponse.ok) {
        console.log('Chatbot conversation progressed successfully!');
        // Handle successful chatbot progression
      } else {
        console.error('Error progressing the chatbot conversation.');
        // Handle error progressing the chatbot conversation
      }
    } catch (error) {
      console.error('Error progressing the chatbot conversation.', error);
      // Handle any network or other errors
    }
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    // Call both upload and chatbot progression functions
    handleImageUpload();

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageUploadForm;



/*
const ImageUploadForm = ({ sessionKey }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (selectedImage) {
      const formData = new FormData();
      formData.append('session_key', sessionKey);
      formData.append('image_upload', selectedImage);

      try {
        const response = await fetch('https://api.eazibots.com/api/img-upload/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Form submitted successfully!', data);
          // Handle the successful response here
        } else {
          console.error('Error submitting the form.');
          // Handle the error response here
        }
      } catch (error) {
        console.error('Error submitting the form.', error);
        // Handle any network or other errors here
      }
    } else {
      console.error('No image selected.');
      // Handle the case when no image is selected
    }
    
      const handleChatbotProgress = async () => {
    // Code to progress the chatbot conversation to a different endpoint
    try {
      const progressResponse = await fetch('https://api.eazibots.com/api/chatbot-progress', {
        method: 'POST',
        body: JSON.stringify({ session_key: sessionKey }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (progressResponse.ok) {
        console.log('Chatbot conversation progressed successfully!');
        // Handle successful chatbot progression
      } else {
        console.error('Error progressing the chatbot conversation.');
        // Handle error progressing the chatbot conversation
      }
    } catch (error) {
      console.error('Error progressing the chatbot conversation.', error);
      // Handle any network or other errors
    }
  };

 
  };

  return (
    <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Submit</button>
          </form>
          </div>
    </div>
  );
};

export default ImageUploadForm;
*/
