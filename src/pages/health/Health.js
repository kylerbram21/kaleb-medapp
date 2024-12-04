import React, { useState } from "react";

const Health = ({ userStats, handleAIResponse }) => {
  // Destructure user stats
  const {
    waterIntake,
    workoutDays,
    sleepHours,
    stretchFrequency,
  } = userStats;

  // Scoring logic
  let score = 0;

  if (waterIntake > 15) score += 2;
  if (workoutDays >= 5) score += 5;
  if (sleepHours >= 8) score += 5;
  if (stretchFrequency >= 2 && stretchFrequency <= 3) score += 3;
  if (stretchFrequency === 7) score += 2;

  const maxScore = 15;
  const percentage = (score / maxScore) * 100;

  let grade;
  if (percentage >= 90) grade = "A";
  else if (percentage >= 80) grade = "B";
  else if (percentage >= 70) grade = "C";
  else if (percentage >= 60) grade = "D";
  else grade = "F";

  const chatMessage =
    percentage >= 90
      ? "Great job with your health!"
      : "Ask me for help on areas of improvement!";

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ sender: "AI", text: chatMessage }]);

  // Handle user input
  const handleSend = () => {
    if (!chatInput.trim()) return; // Prevent empty messages
    const userMessage = { sender: "User", text: chatInput };
    const aiResponse = handleAIResponse(chatInput); // Get AI response from a function
    setChatHistory([...chatHistory, userMessage, { sender: "AI", text: aiResponse }]);
    setChatInput(""); // Clear input field
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerText}>Health Score</h1>
      <div style={styles.card}>
        <h2 style={styles.headerText}>Your Score: {score} / {maxScore}</h2>
        <h3 style={styles.headerText}>Grade: {grade}</h3>
        <p style={styles.headerText}>Percentage: {percentage.toFixed(2)}%</p>
      </div>
      <div style={styles.details}>
        <h3 style={styles.detailText}>Details:</h3>
        <ul style={styles.detailText}>
          <li>Water Intake: {waterIntake} cups</li>
          <li>Workout Days: {workoutDays} days</li>
          <li>Sleep Hours: {sleepHours} hours</li>
          <li>Stretching Frequency: {stretchFrequency} times/week</li>
        </ul>
      </div>
      <div style={styles.chatBox}>
        <h3 style={styles.chatHeader}>Our Recommendations on how to improve!</h3>
        <div style={styles.chatContent}>
          {chatHistory.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.chatMessage,
                alignSelf: message.sender === "User" ? "flex-end" : "flex-start",
                backgroundColor: message.sender === "User" ? "#4caf50" : "#333",
              }}
            >
              <strong>{message.sender}: </strong>
              {message.text}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={styles.chatInput}
            placeholder="Type your message here..."
          />
          <button onClick={handleSend} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" },
  card: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#1a1a1a",
    width: "50%",
    textAlign: "center",
  },
  details: {
    marginTop: "20px",
    textAlign: "left",
    marginLeft: "25%",
    marginRight: "25%",
  },
  headerText: { color: "#fff" },
  detailText: { color: "#fff" },
  chatBox: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#333",
    width: "50%",
    margin: "0 auto",
    textAlign: "center",
  },
  chatHeader: { color: "#fff", fontSize: "18px", marginBottom: "10px" },
  chatContent: {
    color: "#fff",
    fontSize: "16px",
    backgroundColor: "#444",
    padding: "10px",
    borderRadius: "5px",
    maxHeight: "150px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  chatMessage: {
    margin: "5px 0",
    padding: "10px",
    borderRadius: "10px",
    color: "#fff",
  },
  inputContainer: { display: "flex", marginTop: "10px" },
  chatInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px 0 0 5px",
    border: "1px solid #ddd",
    outline: "none",
  },
  sendButton: {
    padding: "10px 15px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
};

// Example AI response function
const handleAIResponse = (userInput) => {
  // Replace with actual AI integration logic
  if (userInput.toLowerCase().includes("workout")) {
    return "Try incorporating more cardio exercises!";
  } else if (userInput.toLowerCase().includes("water")) {
    return "Aim for at least 15 cups of water daily.";
  } else {
    return "That's a great question! Keep up the good work.";
  }
};

// Example usage
const App = () => {
  const userStats = {
    waterIntake: 18,
    workoutDays: 7,
    sleepHours: 7,
    stretchFrequency: 0,
  };

  return <Health userStats={userStats} handleAIResponse={handleAIResponse} />;
};

export default App;
