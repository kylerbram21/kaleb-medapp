import React, { useState, useEffect } from 'react';
import { firestore, storage } from "../../firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function UploadForm() {
  // State to store text, image, and data
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [aiQuestion, setAiQuestion] = useState(''); // State for AI question input
  const [selectedDays, setSelectedDays] = useState([]); // State for selected days of the week
  const [suggestionText, setSuggestionText] = useState(''); // State for suggestion text
  const [isWorkoutGood, setIsWorkoutGood] = useState(false)
  const [userWorkouts, setUserWorkouts] = useState({})
  const [imageUpload, setImageUpload] = useState();
 
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const docData = {
      "workoutDays": selectedDays,
      "workoutDescription" : textInput,
    }

    try {
      const docRef = doc(firestore, "workout", "user")
    
    await setDoc(docRef, docData)
    

    console.log("worked")
    } catch(e){
      console.error("didn't work", e)
    }
  };

  const getData = async () => {
    const firestoreRef = doc(firestore, "goal", "user");

    try{
      const snapShot = await getDoc(firestoreRef);
 
     if(snapShot.exists()){
       setUserWorkouts(snapShot.data())
     }else{
       console.log("Nope")
     }
 
     }catch(err){
       console.log(err)
     }
   
}

  const recommendationMessage = isWorkoutGood
    ? "Great recovery and taking care of your body!"
    : "Try working out more days and/or wokring out a little longer!";

  // Handle text input change
  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  // upload file to Firebase
  const uploadFile = () => {
    if(!imageUpload) return;

    const imageRef = ref(storage, 'kylerBram21/images/${imageUpload.name}');

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
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
    if (file && file.type === 'application/PDF') {
      setDataFile(file);
    } else {
      alert('Please upload a valid JSON file.');
    }
  };

  // Handle messaging in the chat
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { sender: "User", text: userInput }]);
      setUserInput(""); // Reset input field after sending message

      // Simulate a response from the chatbot (can be improved with more logic)
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: "Here are some stretching ideas: Try some basic stretches like forward bends, side stretches, and arm circles." },
      ]);
    }
  };

  // Handle day click for check circles
  const handleDayClick = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((d) => d !== day); // Deselect day
      } else {
        return [...prevSelectedDays, day]; // Select day
      }
    });
  };

  useEffect(() => {
    getData()
  }, [])

  // Update suggestion text based on selected days
  useEffect(() => {
    if (selectedDays.length === 0) {
      setSuggestionText('You haven’t selected any workout days yet.');
    } else if (selectedDays.length === 7) {
      setSuggestionText('Great! You’re committed to working out every day!');
    } else {
      setSuggestionText(`You have selected ${selectedDays.length} workout days. Keep it up!`);
    } 
    if (selectedDays.length >= 3){
      setIsWorkoutGood(true)
    }
    if  (selectedDays.length < 3){
      setIsWorkoutGood(false)
    }
  }, [selectedDays]); // Trigger whenever selectedDays changes

  return (
    <div className="upload-form">
      {/* Title for the workout data form */}
      <h1>Submit Your Workout Data</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit2}>
        {/* Text Input */}
        <div className="form-group">
          <label htmlFor="textInput">Workout Description:</label>
          <input
            type="text"
            id="textInput"
            value={textInput}
            onChange={(evt)=> setTextInput(evt.target.value)}
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
          <label htmlFor="dataUpload">Upload Workout Data (PDF format):</label>
          <input
            type="file"
            id="dataUpload"
            accept=".PDF"
            onChange={handleDataChange}
          />
        </div>

        <div>
     <button
        onClick={(evt)=>handleSubmit2(evt)}
        style={{
          backgroundColor: "#1d4e89",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Save
      </button>  
    </div>       

        {/* Week Days Section */}
        <div className="week-days-section" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2>Select Your Workout Days</h2>
          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '10px', 
            gap: '10px' // Adds space between the buttons
          }}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                style={{
                  padding: "15px 20px",
                  backgroundColor: selectedDays.includes(day) ? "#007BFF" : "#FFF", // Change background color
                  color: selectedDays.includes(day) ? "#FFF" : "#007BFF", // Change text color
                  border: "2px solid #007BFF", // Border color to blue
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                }}
              >
                {day[0]} {/* Display first letter of the day */}
              </button>
            ))}
          </div>
        </div>

        {/* Counter for selected days */}
        <div className="selected-days-counter">
          <h3>Selected Days: {selectedDays.length} / 7</h3>
        </div>
</form>

      <div
  style={{
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #fff", // Thin white border around the box
    borderRadius: "10px",
    backgroundColor: "#232323", // Match the page background color
    color: "#f4f4f4", // Dark text for readability
    maxWidth: "calc(100% - 4in)", // Keeps the 2-inch margins
    margin: "0 auto", // Centers the box
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
    fontFamily: "Arial, sans-serif", // Matches typical web fonts
  }}
>
  <h3
    style={{
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#f4f4f4", // Matches button styles
    }}
  >
    Our Recommendation
  </h3>
  <p
    style={{
      fontSize: "16px",
      lineHeight: "1.5",
    }}
  >
    {isWorkoutGood
      ? "Great number of workouts!!"
      : "Try working out more"}
  </p>

  {!isWorkoutGood && (
    <div
      style={{
        marginTop: "15px",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#ffffff", // White background for the suggestion box
        color: "#333", // Dark text for readability
        border: "1px solid #fff", // Thin white border
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
      <p style={{ margin: "0", fontSize: "14px" }}>
        Try drinking at least 16 cups of water and stretching 2-3 days to maximize your recovery.
      </p>
    </div>
  )}
</div>



      {/* Chat Box Section */}
      <div
        style={{
          backgroundColor: "#007BFF",
          color: "#FFF",
          padding: "8px 15px",
          borderRadius: "10px 10px 0 10px",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        Need help with workout ideas or safer workouts? Just ask me!
      </div>
      
      {/* Chat Window */}
      <div
        style={{
          marginTop: "10px",
          maxHeight: "200px",
          overflowY: "scroll",
          textAlign: "left",
          backgroundColor: "#FFF",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        {messages.map((message, index) => (
          <p key={index} style={{ margin: "5px 0", textAlign: message.sender === "Bot" ? "left" : "right" }}>
            <strong>{message.sender}:</strong> {message.text}
          </p>
        ))}
      </div>

      {/* Input for sending messages */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "8px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default UploadForm;
