import React, { useState } from "react";

const Goals = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState("");

  const handleGoalChange = (e) => {
    setSelectedGoal(e.target.value);
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleDaysSelect = (days) => {
    setSelectedDays(days);
  };

  const handleProteinSelect = (protein) => {
    setSelectedProtein(protein);
  };

  const submitPrompt = () => {
    if (prompt) {
      alert(
        `Your question: "${prompt}" has been submitted!\nGoal: ${selectedGoal}\nDays: ${selectedDays}\nProtein: ${selectedProtein}`
      );
      // Here you can add code to send the prompt, goal, days, and protein to the AI backend
    } else {
      alert("Please enter a question.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Goal Selection Dropdown */}
      <div style={styles.goalContainer}>
        <h3>Select Your Goal</h3>
        <select
          value={selectedGoal}
          onChange={handleGoalChange}
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
              onClick={() => handleDaysSelect(days)}
              style={{
                ...styles.dayButton,
                backgroundColor: selectedDays === days ? "#007bff" : "#f0f0f0",
                color: selectedDays === days ? "#fff" : "#333",
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

      {/* Daily Protein Selection */}
      <div style={styles.proteinContainer}>
        <h3>Select Your Daily Protein Intake</h3>
        <div style={styles.buttonGroup}>
          <button
            onClick={() =>
              handleProteinSelect("Sedentary (56g or 0.8 x body weight)")
            }
            style={{
              ...styles.proteinButton,
              backgroundColor:
                selectedProtein === "Sedentary (56g or 0.8 x body weight)"
                  ? "#007bff"
                  : "#f0f0f0",
              color:
                selectedProtein === "Sedentary (56g or 0.8 x body weight)"
                  ? "#fff"
                  : "#333",
            }}
          >
            Sedentary
          </button>
          <button
            onClick={() =>
              handleProteinSelect("Active (84-112g or 1.2-1.6 x body weight)")
            }
            style={{
              ...styles.proteinButton,
              backgroundColor:
                selectedProtein === "Active (84-112g or 1.2-1.6 x body weight)"
                  ? "#007bff"
                  : "#f0f0f0",
              color:
                selectedProtein === "Active (84-112g or 1.2-1.6 x body weight)"
                  ? "#fff"
                  : "#333",
            }}
          >
            Active
          </button>
          <button
            onClick={() =>
              handleProteinSelect("Athlete (113-154g or 1.6-2.2 x body weight)")
            }
            style={{
              ...styles.proteinButton,
              backgroundColor:
                selectedProtein === "Athlete (113-154g or 1.6-2.2 x body weight)"
                  ? "#007bff"
                  : "#f0f0f0",
              color:
                selectedProtein === "Athlete (113-154g or 1.6-2.2 x body weight)"
                  ? "#fff"
                  : "#333",
            }}
          >
            Athlete
          </button>
          <button
            onClick={() =>
              handleProteinSelect("Lose Weight (0.7-1.5 x body weight)")
            }
            style={{
              ...styles.proteinButton,
              backgroundColor:
                selectedProtein === "Lose Weight (0.7-1.5 x body weight)"
                  ? "#007bff"
                  : "#f0f0f0",
              color:
                selectedProtein === "Lose Weight (0.7-1.5 x body weight)"
                  ? "#fff"
                  : "#333",
            }}
          >
            Lose Weight
          </button>
        </div>
        <p style={styles.selectedProtein}>
          {selectedProtein ? `Selected Protein: ${selectedProtein}` : ""}
        </p>
      </div>

      {/* Prompt Box */}
      <div style={styles.promptBox}>
        <h2>Ask the AI</h2>
        <textarea
          value={prompt}
          onChange={handleChange}
          placeholder="Type your question here..."
          style={styles.textarea}
        />
        <button onClick={submitPrompt} style={styles.button}>
          Ask
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Stack the elements vertically
    height: "100vh",
    margin: 0,
    backgroundColor: "#f4f4f9",
  },
  goalContainer: {
    marginBottom: "20px", // Add space between goal selector and prompt box
    textAlign: "center",
  },
  select: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  selectedGoal: {
    marginTop: "10px",
    fontSize: "1.1em",
    color: "#555",
  },
  daysContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  dayButton: {
    padding: "10px 20px",
    fontSize: "1.1em",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  selectedDays: {
    fontSize: "1.1em",
    color: "#555",
  },
  proteinContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  proteinButton: {
    padding: "10px 20px",
    fontSize: "1.1em",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  selectedProtein: {
    fontSize: "1.1em",
    color: "#555",
  },
  promptBox: {
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "1em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1em",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Goals;
