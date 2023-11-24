import React, { useState } from 'react'

function ImageDisplay() {
    const [imageSrc, setimageSrc] = useState(null);
    const [inputStr, setinputStr] = useState("");
    const fetchData = async () => {
        try {
            const data = { "inputs": inputStr };
            const response = await query(data);
            const imageUrl = URL.createObjectURL(response);
            setimageSrc(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
    const handleInputChange =(e) => {
        setinputStr(e.target.value)
    }
    return (
        <>
            <div className="inputDiv">
                <label htmlFor="prompt">Enter Prompt</label>
                <input
                    type="text"
                    id="prompt"
                    value={inputStr}
                    onChange={handleInputChange}
                />
                <button onClick={fetchData}>Fetch Image</button>
            </div>

            {imageSrc && <div className="fetchedImg">
                <img src={imageSrc} alt="Fetched Image" />
            </div>}
        </>
    )
}

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
export default ImageDisplay