import React, { useState, useEffect } from "react";
import "./Home.css"; // Import the CSS file
import runningImage from "../../assets/runningMan.webp";

import { firestore } from "../../firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

// The attempt at using firebase

// The base componet of the Home page
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
  const [userProfile, setUserProfile] = useState({})
  const lbsToKgs = (lbs) => {
    return (lbs * 0.453592).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (age <= 0 || isNaN(age)) {
      alert("Please enter a valid age.");
      return;
    }

   
    const docData = {
      "name": name,
      "age" : age,
      "gender" : gender,
      "activityLevel" : activityLevel,
      "goal" :goal, 
      "weightLbs" : weightLbs

    }

    try {
      const docRef = doc(firestore, "data", "user")
    
    await setDoc(docRef, docData)
    

    console.log("worked")
    } catch(e){
      console.error("didn't work", e)
    }
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

  const getData = async () => {
    const firestoreRef = doc(firestore, "data", "user");

    try{
     const snapShot = await getDoc(firestoreRef);

    if(snapShot.exists()){
      setUserProfile(snapShot.data())
    }else{
      console.log("Nope")
    }

    }catch(err){
      console.log(err)
    }
  
  }

 useEffect(() =>{
   getData()
  
 })

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
        {!userProfile.name ? (
          <p>No profiles added yet.</p>
        ) : (
            <div className="profile-card">
              <div className="profile-details">
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Age:</strong> {userProfile.age}</p>
                <p><strong>Gender:</strong> {userProfile.gender}</p>
                <p><strong>Activity Level:</strong> {userProfile.activityLevel}</p>
                <p><strong>Goals:</strong> {userProfile.goal}</p>
                <p><strong>Weight:</strong> {userProfile.weightLbs} lbs ({lbsToKgs(userProfile.weightLbs)} kg)</p>
              </div>
            </div>
          
        )}
      </div>
    </div>
  );
};

export default Home;
