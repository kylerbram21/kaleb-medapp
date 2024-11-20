import React, { useState } from "react";
import "./Home.css"; // Import the CSS file
import runningImage from "../../assets/runningMan.webp";

import { firestore } from "../../firebase";
import { addDoc, getDoc, collection } from "firebase/firestore";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [weightLbs, setWeightLbs] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const lbsToKgs = (lbs) => {
    return (lbs * 0.453592).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (age <= 0 || isNaN(age)) {
      alert("Please enter a valid age.");
      return;
    }

    const newProfile = { name, age, gender, activityLevel, goal, weightLbs };

    if (isEditing) {
      const updatedProfiles = profiles.map((profile, index) =>
        index === editIndex ? newProfile : profile
      );
      setProfiles(updatedProfiles);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setProfiles([...profiles, newProfile]);
    }

    setName("");
    setAge("");
    setGender("");
    setActivityLevel("");
    setGoal("");
    setWeightLbs("");
  };

  const handleEdit = (index) => {
    const profile = profiles[index];
    setName(profile.name);
    setAge(profile.age);
    setGender(profile.gender);
    setActivityLevel(profile.activityLevel);
    setGoal(profile.goal);
    setWeightLbs(profile.weightLbs);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
  };

  const firestoreRef = collection(firestore, "test");


 // console.log(firestoreRef.getDoc("test"))

  return (
    <div className="container">
      <h1>Welcome to the Profile Manager!</h1>
      <h1>

      </h1>
      <h2>{isEditing ? "Edit Profile" : "Enter Your Profile Details"}</h2>
      <img src={runningImage} alt="Running" width={100} />

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Your Weight in Lbs:
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              required
            />
          </label>
          {weightLbs && (
            <div className="weight-conversion">
              <p>Weight in Kgs: {lbsToKgs(weightLbs)} kg</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            Activity Level:
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Active">Active</option>
              <option value="Athlete">Athlete</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Goals:
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Cardio">Cardio</option>
              <option value="Build Muscle">Build Muscle</option>
              <option value="Lose Weight">Lose Weight</option>
            </select>
          </label>
        </div>

        <button type="submit" className="submit-button">
          {isEditing ? "Update Profile" : "Add Profile"}
        </button>
      </form>

      <h2>All Profiles</h2>
      <div className="profile-list">
        {profiles.length === 0 ? (
          <p>No profiles added yet.</p>
        ) : (
          profiles.map((profile, index) => (
            <div key={index} className="profile-card">
              <div className="profile-details">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Activity Level:</strong> {profile.activityLevel}</p>
                <p><strong>Goals:</strong> {profile.goal}</p>
                <p><strong>Weight:</strong> {profile.weightLbs} lbs ({lbsToKgs(profile.weightLbs)} kg)</p>
              </div>

              <div className="profile-actions">
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
