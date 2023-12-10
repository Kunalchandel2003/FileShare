import React, { useState } from 'react';
import axios from 'axios';
import './file.css'

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [uuid, setUuid] = useState("");
  const [bool, setBool] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('myfile', file);

    try {
      const response = await axios.post("https://file-sharing-13d6.onrender.com/api/files/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLink(response.data.file);
      setUuid(response.data.uuid);
      setBool(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  const handleFileUpload2 = async () => {
    if (!emailTo || !emailFrom || !uuid) {
      setErrorMessage('Please enter all the required details properly');
      return;
    }

    const emailData = {
      uuid,
      emailTo,
      emailFrom,
    };

    try {
      const response = await axios.post("https://file-sharing-13d6.onrender.com/api/files/send", emailData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      setErrorMessage('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage('Error sending email. Please try again.');
    }
  };

  return (
    <div className="app-wrapper">
      <img src="https://send.creativeshi.com/logo.png" alt="Inshare logo" class="logo"/>
      <div className="container">
        <div className="upload-box">
          <input type="file" onChange={handleFileChange} onClick={() => setBool(false)} />
          <button onClick={handleFileUpload}>Upload File</button>

          {bool && (
            <div className="upload-section">
              <p>{link}</p>
              <input type="text" onChange={(e) => setEmailTo(e.target.value)} placeholder="Recipient's email" />
              <input type="text" onChange={(e) => setEmailFrom(e.target.value)} placeholder="Your email" />
              <button onClick={handleFileUpload2}>Send Email</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default UploadFile;