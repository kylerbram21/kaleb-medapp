import React, { useState, useEffect } from "react";
import "./Goals.css";
import { firestore } from "../../firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

const Goals = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userGoals, setUserGoals] = useState({});

  const SaveButton = (evt) => {
    return (
      <button
        onClick={()=>handleSubmit(evt)}
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
    );
  };
  

  const durations = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour 15 minutes",
    "1 hour 30 minutes",
    "1 hour 45 minutes",
    "2 hours",
    "2 hours 15 minutes",
    "2 hours 30 minutes",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docData = {
      "goal": selectedGoal,
      "numberWorkoutDays" : selectedDays,
      "duration" : selectedDuration,
      "selectedProtein" : selectedProtein,
    }

    try {
      const docRef = doc(firestore, "goals", "user")
    
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
       setUserGoals(snapShot.data())
     }else{
       console.log("Nope")
     }
 
     }catch(err){
       console.log(err)
     }
   
}

const handleDurationChange = (e) => {
  setSelectedDuration(e.target.value);
};

  const handleSendMessage = () => {
    if (userInput) {
      const newMessage = { sender: "User", text: userInput };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserInput("");

      setTimeout(() => {
        const botResponse = { sender: "Bot", text: "Thanks for your message! Let me help you with that." };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const getRecommendations = () => {
    if (!selectedGoal || !selectedDays || !selectedDuration || !selectedProtein) {
      return "Please complete all selections to see your personalized recommendations.";
    }

    let recommendations = `Based on your selections: \n`;

    // Goal-based suggestions
    if (selectedGoal === "cardio") {
      recommendations += `- Focus on aerobic exercises like running, cycling, or swimming for ${selectedDuration}.\n`;
    } else if (selectedGoal === "gainMuscle") {
      recommendations += `- Prioritize strength training exercises (e.g., weightlifting) for ${selectedDuration}.\n`;
    } else if (selectedGoal === "loseWeight") {
      recommendations += `- Combine high-intensity interval training (HIIT) with strength exercises for ${selectedDuration}.\n`;
    }

    // Days and protein intake
    recommendations += `- Workout ${selectedDays} days a week, ensuring proper rest and recovery.\n`;
    recommendations += `- Maintain a daily protein intake of ${selectedProtein} to support your goal.\n`;

    recommendations += `Stay consistent and listen to your body!`;

    return recommendations;
  };

  useEffect(() => {
    getData()
  }, [])


  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container">
      {/* Goal Selection Dropdown */}
      <div style={styles.goalContainer}>
        <h3>Select Your Goal</h3>
        <select
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          style={styles.select}
        >
          <option value="">Choose a goal</option>
          <option value="cardio">Cardio</option>
          <option value="gainMuscle">Gain Muscle</option>
          <option value="loseWeight">Lose Weight</option>
        </select>
        <p style={styles.selectedGoal}>
          {selectedGoal ? `Selected Goal: ${selectedGoal}` : ""}
        </p>
      </div>

      {/* Days Selection Button Group */}
      <div style={styles.daysContainer}>
        <h3>How many days do you want to workout?</h3>
        <div style={styles.buttonGroup}>
          {[1, 2, 3, 4, 5, 6, 7].map((days) => (
            <button
              key={days}
              onClick={() => setSelectedDays(days)}
              style={{
                ...styles.dayButton,
                backgroundColor: selectedDays === days ? "#007BFF" : "#FFF",
                color: selectedDays === days ? "#FFF" : "#007BFF",
              }}
            >
              {days}
            </button>
          ))}
        </div>
        <p style={styles.selectedDays}>
          {selectedDays ? `Selected Days: ${selectedDays}` : ""}
        </p>
      </div>

      {/* Duration of Workouts Dropdown */}
      <div style={styles.durationContainer}>
        <h3>Duration of Workouts!</h3>
        <select
          value={selectedDuration}
          onChange={(evt)=> handleDurationChange(evt)}
          style={styles.select}
        >
          <option value="">Choose a duration</option>
          {durations.map((duration, index) => (
            <option key={index} value={duration}>
              {duration}
            </option>
          ))}
        </select>
        <p style={styles.selectedDuration}>
          {selectedDuration ? `Selected Duration: ${selectedDuration}` : ""}
        </p>
      </div>

      {/* Protein Intake Selection */}
      <div style={styles.proteinContainer}>
        <h3>Select Your Daily Protein Intake</h3>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setSelectedProtein("Sedentary (56g or 0.8 x body weight)")}
            style={{
              ...styles.proteinButton,
              backgroundColor: selectedProtein === "Sedentary (56g or 0.8 x body weight)" ? "#007BFF" : "#FFF",
              color: selectedProtein === "Sedentary (56g or 0.8 x body weight)" ? "#FFF" : "#007BFF",
            }}
          >
            Sedentary
          </button>
          <button
            onClick={() => setSelectedProtein("Active (84-112g or 1.2-1.6 x body weight)")}
            style={{
              ...styles.proteinButton,
              backgroundColor: selectedProtein === "Active (84-112g or 1.2-1.6 x body weight)" ? "#007BFF" : "#FFF",
              color: selectedProtein === "Active (84-112g or 1.2-1.6 x body weight)" ? "#FFF" : "#007BFF",
            }}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedProtein("Athlete (113-154g or 1.6-2.2 x body weight)")}
            style={{
              ...styles.proteinButton,
              backgroundColor: selectedProtein === "Athlete (113-154g or 1.6-2.2 x body weight)" ? "#007BFF" : "#FFF",
              color: selectedProtein === "Athlete (113-154g or 1.6-2.2 x body weight)" ? "#FFF" : "#007BFF",
            }}
          >
            Athlete
          </button>
          <button
            onClick={() => setSelectedProtein("Lose Weight (0.7-1.5 x body weight)")}
            style={{
              ...styles.proteinButton,
              backgroundColor: selectedProtein === "Lose Weight (0.7-1.5 x body weight)" ? "#007BFF" : "#FFF",
              color: selectedProtein === "Lose Weight (0.7-1.5 x body weight)" ? "#FFF" : "#007BFF",
            }}
          >
            Lose Weight
          </button>
        </div>
        <p style={styles.selectedProtein}>
          {selectedProtein ? `Selected Protein: ${selectedProtein}` : ""}
        </p>
      </div>

     <div>
     <button
        onClick={(evt)=>handleSubmit(evt)}
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
    

      {/* Recommendations Section */}
      <div style={styles.recommendationsContainer}>
        <h3>Our Recommendations</h3>
        <div style={styles.recommendationsBox}>
          <p>{getRecommendations()}</p>
        </div>
      </div>

      {/* Chat Section */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        Need help with workout ideas or safer workouts? Just ask me!
      </div>
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
          <p
            key={index}
            style={{
              margin: "5px 0",
              textAlign: message.sender === "Bot" ? "left" : "right",
              color: "#000",
            }}
          >
            <strong>{message.sender}:</strong> {message.text}
          </p>
        ))}
      </div>
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

        <div className="profile-list">
        {!userGoals.name ? (
          <p>No profiles added yet.</p>
        ) : (
            <div className="profile-card">
              <div className="profile-details">
                <p><strong>Name:</strong> {userGoals.selectedGoal}</p>
                <p><strong>Age:</strong> {userGoals.selectedDays}</p>
                <p><strong>Gender:</strong> {userGoals.selectedDuration}</p>
                <p><strong>Activity Level:</strong> {userGoals.selectedProtein}</p>
              </div>
            </div>
        )}

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
    </div>

    
  );
};

const styles = {
  goalContainer: { margin: "20px 0" },
  select: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" },
  selectedGoal: { fontSize: "14px", color: "#555" },
  daysContainer: { marginTop: "20px" },
  buttonGroup: { display: "flex", gap: "10px" },
  dayButton: { padding: "10px 15px", borderRadius: "5px", border: "1px solid #ccc", cursor: "pointer" },
  selectedDays: { fontSize: "14px", color: "#555" },
  durationContainer: { marginTop: "20px" },
  selectedDuration: { fontSize: "14px", color: "#555" },
  proteinContainer: { marginTop: "20px" },
  proteinButton: { padding: "10px 15px", borderRadius: "5px", border: "1px solid #ccc", cursor: "pointer" },
  selectedProtein: { fontSize: "14px", color: "#555" },
  recommendationsContainer: { marginTop: "20px" },
  recommendationsBox: {
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#F9F9F9",
    fontSize: "14px",
    color: "#333",
  },
};

export default Goals;