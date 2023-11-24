import React, { useEffect, useState } from 'react';
import ImageContainer from '../ImageContainer/ImageContainer';
import BounceLoader from "react-spinners/BounceLoader";
import './InputForm.css'; // Import the CSS file

const InputForm = () => {
  const [prompts, setPrompts] = useState(Array(10).fill(''));
  const [Responses, setResponses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Loading Screen
  const [loading, setloading] = useState(false);

  const [imageContainerBox, setimageContainerBox] = useState(false);

  const handleInputChange = (index, value) => {
    const newPrompts = [...prompts];
    newPrompts[index] = value;
    setPrompts(newPrompts);
  };

  const handleSubmit = async () => {
    // Check for empty prompts
    console.log("Submit is pressed");
    if (prompts.some(prompt => prompt.trim() === '')) {
      setErrorMessage('Empty prompts are not allowed.');
      return;
    }

    // Clear previous error message
    setErrorMessage('');

    try {
      setloading(true);
      console.log("fetching data from api...");
      const responses = await Promise.all(prompts.map(prompt => query({ inputs: prompt })));
      // Handle responses here, e.g., display images
      console.log(responses);
      setResponses(responses);
      if (responses) {
        setimageContainerBox(true);
        setloading(false);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="main-container">
      {loading ? (
        <div className="loader-container">
          <BounceLoader
            color={"#36d7b7"}
            loading={loading}
            size={150}
            aria-label="Bounce Loader"
          />
        </div>
      ) : (
        <div className="content-container">
          <div className="title">
            <h2>Enter Your Prompts To Generate Your Comic Strip</h2>
            <p>Warning: Image Generation Might Take Around 10 minutes so enter your prompts carefully</p>
          </div>
          <div className="prompts-form">
            {prompts.map((prompt, index) => (
              <div className="prompt-field" key={index}>
                <label htmlFor={`prompt${index + 1}`}>{`Prompt ${index + 1}`}</label>
                <input
                  type="text"
                  id={`prompt${index + 1}`}
                  value={prompt}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}
            <button onClick={handleSubmit}>Generate Panel</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          {imageContainerBox && (
            <div className="image-container">
              <ImageContainer responses={Responses} closeContainer={setimageContainerBox} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

async function query(data) {
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        "Accept": "image/png",
        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

export default InputForm;
