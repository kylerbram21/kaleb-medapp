import React, { useState } from 'react';

function UploadForm() {
  // State to store text, image, and data
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [aiQuestion, setAiQuestion] = useState(''); // State for AI question input

  // Handle text input change
  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    } else {
      alert('Please upload a valid image.');
    }
  };

  // Handle data file change
  const handleDataChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      setDataFile(file);
    } else {
      alert('Please upload a valid JSON file.');
    }
  };

  // Handle AI question change
  const handleAiQuestionChange = (e) => {
    setAiQuestion(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log or process the text, image, and data files here
    console.log('Workout Data Text:', textInput);
    if (imageFile) {
      console.log('Image File:', imageFile.name);
    }
    if (dataFile) {
      console.log('Data File:', dataFile.name);
    }
    console.log('AI Question:', aiQuestion);
    
    // You can now send this data to a server, etc.
  };

  return (
    <div className="upload-form">
      {/* Title for the workout data form */}
      <h1>Submit Your Workout Data</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <div className="form-group">
          <label htmlFor="textInput">Workout Description:</label>
          <input
            type="text"
            id="textInput"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Describe your workout..."
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="imageUpload">Upload Image (e.g., workout photo):</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Data File Upload (e.g., JSON file with workout data) */}
        <div className="form-group">
          <label htmlFor="dataUpload">Upload Workout Data (JSON format):</label>
          <input
            type="file"
            id="dataUpload"
            accept=".json"
            onChange={handleDataChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Section for asking AI workout specialist */}
      <div className="ai-question-section">
        <h2>Ask your AI Workout Specialist for suggestions!</h2>
        <textarea
          id="aiQuestion"
          value={aiQuestion}
          onChange={handleAiQuestionChange}
          placeholder="Ask your AI Workout Specialist for suggestions..."
          rows="6"
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
}

export default UploadForm;
