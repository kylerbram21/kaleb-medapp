import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

// Reusable component for Time Selector
const TimeSelector = ({ title, time, setTime, showTimeMenu, setShowTimeMenu }) => {
  const adjustTime = (type, increment) => {
    setTime((prevTime) => {
      let { hour, minute, period } = prevTime;

      if (type === "hour") {
        hour += increment;
        if (hour > 12) {
          hour = 1;
          period = period === "AM" ? "PM" : "AM";
        } else if (hour < 1) {
          hour = 12;
          period = period === "AM" ? "PM" : "AM";
        }
      } else if (type === "minute") {
        minute += increment;
        if (minute >= 60) {
          minute = 0;
          hour += 1;
          if (hour > 12) {
            hour = 1;
            period = period === "AM" ? "PM" : "AM";
          }
        } else if (minute < 0) {
          minute = 45;
          hour -= 1;
          if (hour < 1) {
            hour = 12;
            period = period === "AM" ? "PM" : "AM";
          }
        }
      }
      return { hour, minute, period };
    });
  };

  return (
    <div>
      <h2>{title}</h2>
      <div
        style={{
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
          textAlign: "center",
          userSelect: "none",
          position: "relative",
        }}
        onClick={() => setShowTimeMenu(!showTimeMenu)}
      >
        <p style={{ margin: "0", fontSize: "18px" }}>
          {time.hour}:{time.minute.toString().padStart(2, "0")} {time.period}
        </p>
        {showTimeMenu && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "0",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
            }}
          >
            <button
              style={{ margin: "5px", padding: "5px", backgroundColor: "#007BFF", color: "#FFF" }}
              onClick={() => adjustTime("hour", 1)}
            >
              +1 Hour
            </button>
            <button
              style={{ margin: "5px", padding: "5px", backgroundColor: "#007BFF", color: "#FFF" }}
              onClick={() => adjustTime("hour", -1)}
            >
              -1 Hour
            </button>
            <button
              style={{ margin: "5px", padding: "5px", backgroundColor: "#007BFF", color: "#FFF" }}
              onClick={() => adjustTime("minute", 15)}
            >
              +15 Minutes
            </button>
            <button
              style={{ margin: "5px", padding: "5px", backgroundColor: "#007BFF", color: "#FFF" }}
              onClick={() => adjustTime("minute", -15)}
            >
              -15 Minutes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Rest Component
const Rest = () => {
  const [restDays, setRestDays] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dailyWaterIntake, setDailyWaterIntake] = useState("");
  const [stretchedDays, setStretchedDays] = useState([]);
  const [wakeTime, setWakeTime] = useState({ hour: 12, minute: 0, period: "AM" });
  const [sleepTime, setSleepTime] = useState({ hour: 12, minute: 0, period: "AM" });
  const [showWakeMenu, setShowWakeMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userRest, setUserRest] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docData = {
      "restDays": restDays,
      "dailyWaterIntake" : dailyWaterIntake,
      "stretchedDays" : stretchedDays,
      "wakeTime" : wakeTime,
      "sleepTime": sleepTime,
    }

    try {
      const docRef = doc(firestore, "rest", "user")
    
    await setDoc(docRef, docData)
    

    console.log("worked")
    } catch(e){
      console.error("didn't work", e)
    }
  };

  const getData = async () => {
    const firestoreRef = doc(firestore, "rest", "user");

    try{
      const snapShot = await getDoc(firestoreRef);
 
     if(snapShot.exists()){
       setUserRest(snapShot.data())
     }else{
       console.log("Nope")
     }
 
     }catch(err){
       console.log(err)
     }
   
}

  const handleRestDaysChange = (event) => {
    setRestDays(Number(event.target.value));
    setSelectedDays([]);
  };

  const handleDayClick = (day, days, setDays, limit) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else if (days.length < limit) {
      setDays([...days, day]);
    }
  };

  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const handleSend = () => {
    if (chatInput.trim() !== "") {
      setChatHistory([
        ...chatHistory,
        { sender: "User", text: chatInput },
        { sender: "Bot", text: "Here's a tip: Stay consistent with your stretches!" },
      ]);
      setChatInput("");
    }
  };
  
  const styles = {
    chatBox: { marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "10px" },
    chatHeader: { marginBottom: "10px", fontWeight: "bold" },
    chatContent: { maxHeight: "150px", overflowY: "scroll", marginBottom: "10px" },
    chatMessage: { padding: "10px", margin: "5px", borderRadius: "10px", color: "#fff" },
    inputContainer: { display: "flex", gap: "10px" },
    chatInput: { flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" },
    sendButton: { padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" },
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { sender: "User", text: userInput }]);
      setUserInput("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: "Here are some stretching ideas: Try forward bends, side stretches, and arm circles." },
      ]);
    }
  };

  const isRecoveryGood = Number(dailyWaterIntake) >= 16 && stretchedDays.length >= 2;

const recommendationMessage = isRecoveryGood
  ? "Great recovery and taking care of your body!"
  : "Try drinking more water or stretching more to maximize your recovery!";

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <h1>Rest</h1>
      {/* Rest Days Section */}
      <div>
        <label htmlFor="rest-days">Number of Rest Days? </label>
        <select id="rest-days" value={restDays} onChange={handleRestDaysChange}>
          {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <p>You selected {restDays} rest day(s).</p>
      </div>
      
      {/* Water Intake */}
      <h2>Recovery</h2>
      <div>
        <label htmlFor="water-intake">Your Daily Water Intake? (in cups) </label>
        <input
          type="number"
          id="water-intake"
          value={dailyWaterIntake}
          onChange={(e) => setDailyWaterIntake(e.target.value)}
          placeholder="Enter cups"
        />
        <p>You entered: {dailyWaterIntake || "None"} cups</p>
      </div>

      {/* Stretching Section */}
      <h2>Stretching</h2>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
        <button
          key={day}
          onClick={() => handleDayClick(day, stretchedDays, setStretchedDays, 7)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid #007BFF",
            backgroundColor: stretchedDays.includes(day) ? "#28a745" : "#FFF",
            color: stretchedDays.includes(day) ? "#FFF" : "#000",
            cursor: "pointer",
          }}
        >
          {day[0]}
        </button>
      ))}
      <p>Days stretched: {stretchedDays.length} / 7</p>

      <div
  style={{
    ...styles.chatBox,
    maxWidth: "calc(100% - 4in)", // Total width minus 2 inches margin on each side
    margin: "0 auto", // Centers the box horizontally
  }}
>

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

  <h3 style={styles.chatHeader}>
    Need help for ideas on how to stretch? What about recovery? Ask me!
  </h3>
  <div style={styles.chatContent}>
    {chatHistory.map((message, index) => (
      <div
        key={index}
        style={{
          ...styles.chatMessage,
          alignSelf: message.sender === "User" ? "flex-end" : "flex-start",
          backgroundColor: message.sender === "User" ? "#007BFF" : "#333",
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
    {isRecoveryGood
      ? "Great recovery and taking care of your body!"
      : "Try doing more to maximize your recovery!"}
  </p>

  {!isRecoveryGood && (
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





      {/* Time Selector for Wake and Sleep */}
      <TimeSelector
        title="Time to Wake Up"
        time={wakeTime}
        setTime={setWakeTime}
        showTimeMenu={showWakeMenu}
        setShowTimeMenu={setShowWakeMenu}
      />
      <TimeSelector
        title="Time to Sleep"
        time={sleepTime}
        setTime={setSleepTime}
        showTimeMenu={showSleepMenu}
        setShowTimeMenu={setShowSleepMenu}
      />
    </div>
  );
};

export default Rest;

