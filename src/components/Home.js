import React, { useState, useEffect } from "react";
import backgroundImg from "./img/background_img.png";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [startQuestDate, setStartQuestDate] = useState("");
  const [endQuestDate, setEndQuestDate] = useState("");
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [startId, setStartId] = useState("");
  const [endId, setEndId] = useState("");
  const [userId, setUserId] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);}
      // } else {
      //   navigate("/authentication");
      // }
    });
  }, [auth, navigate]);

  useEffect(() => {
    if (userId) {
      fetchStartDate();
      fetchEndDate();
    }
  }, [userId]);

  const fetchStartDate = async () => {
    if (userId) {
      const startCollectionRef = collection(db, `${userId}_startdate`);
      const data = await getDocs(startCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (filteredData.length !== 0) {
        setStartDate(filteredData);
        setStartId(filteredData[0].id);
      }
    }
  };

  const fetchEndDate = async () => {
    if (userId) {
      const endCollectionRef = collection(db, `${userId}_enddate`);
      const data = await getDocs(endCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (filteredData.length !== 0) {
        setEndDate(filteredData);
        setEndId(filteredData[0].id);
      }
    }
  };

  const setStartDateInFirestore = async (date) => {
    if (userId && date && startDate.length === 0) {
      const startCollectionRef = collection(db, `${userId}_startdate`);
      await addDoc(startCollectionRef, { startQuestDate: date });
      fetchStartDate();
    }
  };

  const setEndDateInFirestore = async (date) => {
    if (userId && date && endDate.length === 0) {
      const endCollectionRef = collection(db, `${userId}_enddate`);
      await addDoc(endCollectionRef, { endQuestDate: date });
      fetchEndDate();
    }
  };

  const updateStartDate = async (id, newValue) => {
    if (userId && newValue) {
      const docRef = doc(db, `${userId}_startdate`, id);
      await updateDoc(docRef, { startQuestDate: newValue });
      fetchStartDate();
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    
  };
  const updateEndDate = async (id, newValue) => {
    if (userId && newValue) {
      const docRef = doc(db, `${userId}_enddate`, id);
      await updateDoc(docRef, { endQuestDate: newValue });
      fetchEndDate();
    }
  };

  const deleteDate = async (id, collection) => {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
    setStartDate([]);
    setEndDate([]);
  };

  const handleStartToggle = () => {
    startDate.length === 0
      ? setStartDateInFirestore(startQuestDate)
      : updateStartDate(startId, startQuestDate);
  };

  const handleEndToggle = () => {
    endDate.length === 0 ? setEndDateInFirestore(endQuestDate) : updateEndDate(endId, endQuestDate);
  };

  const isValid = (d1, d2) => {
    if (d1 !== "" && d2 !== "") {
      const date1Obj = new Date(d1);
      const date2Obj = new Date(d2);
      if (date2Obj > date1Obj) {
        return true;
      } else if (userId) {
        deleteDate(startId, `${userId}_startdate`);
        deleteDate(endId, `${userId}_enddate`);
        alert("Invalid Input");
      }
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImg})`, position: "relative", zIndex: "1" }}>
      {!userId && (
        <Link to="/authentication">
          <button1 onClick={toggleForm} style={{ position: "absolute", right: "250px" }}>
            Sign UP
          </button1>
        </Link>
      )}
      {!userId && (
        <Link to="/login">
          <div
            onClick={toggleForm}
            style={{
              position: "absolute",
              right: "180px",
              color: "white",
              fontWeight: "bolder",
              marginTop: "10px",
            }}
          >
            Login
          </div>
        </Link>
      )}
      {userId && (
        <button1 onClick={handleLogout} style={{ position: "absolute", right: "250px" }}>
          Logout
        </button1>
      )}
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <h1 style={{ color: "green" }}>ChallengeQuest</h1>
        <p className="px-5 text-center" style={{ fontSize: "1.5rem" }}>
          Welcome to our challenge quest website, where you embark on exciting journeys towards your
          goals! Are you ready to take on a challenge and push your limits? Whether you're aiming to
          improve your fitness, develop new habits, or conquer personal milestones, our platform is
          here to support you every step of the way.
        </p>
        <p className="px-5 text-center" style={{ fontSize: "1.5rem" }}>
          To begin your adventure, simply set the start date and end date of your challenge. Whether
          you're looking for a short-term sprint or a long-term commitment, our customizable
          challenges allow you to tailor your journey to fit your schedule and preferences.
        </p>
        {userId && 
          <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="start-date" style={{ fontWeight: "bolder" }}>
              Start Date:
            </label>
            <input
              style={{ width: "150px", cursor: "pointer" }}
              type="date"
              className="form-control"
              placeholder="start date"
              onChange={(e) => setStartQuestDate(e.target.value)}
              value={startQuestDate}
            />
            <button2 onClick={handleStartToggle}>{startDate.length === 0 ? "Set" : "Edit"}</button2>
            <label htmlFor="end-date" style={{ marginLeft: "50px", fontWeight: "bolder" }}>
              End Date:
            </label>
            <input
              style={{ width: "150px", cursor: "pointer" }}
              type="date"
              className="form-control border-orange-600"
              placeholder="end date"
              onChange={(e) => setEndQuestDate(e.target.value)}
              value={endQuestDate}
            />
            <button2 onClick={handleEndToggle}>{endDate.length === 0 ? "Set" : "Edit"}</button2>
          </div>
        }
        {!userId && <h2 style={{color:"green"}}>Please signup to start</h2>}
        {startDate.length !== 0 && endDate.length !== 0 && (
          <button1
            onClick={() => {
              deleteDate(startId, `${userId}_startdate`);
              deleteDate(endId, `${userId}_enddate`);
            }}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </button1>
        )}
        {startDate.length !== 0 &&
          endDate.length !== 0 &&
          isValid(startDate[0].startQuestDate, endDate[0].endQuestDate) && (
            <div>
              The start date of the challenge is{" "}
              {startDate.map((item) => (
                <span style={{ color: "green", fontWeight: "bolder" }} key={item.id}>
                  {item.startQuestDate.split("-").reverse().join("-")}
                </span>
              ))}{" "}
              and the end date of the challenge is{" "}
              {endDate.map((item) => (
                <span style={{ color: "green", fontWeight: "bolder" }} key={item.id}>
                  {item.endQuestDate.split("-").reverse().join("-")}
                </span>
              ))}
            </div>
          )}
        {startDate.length !== 0 && endDate.length !== 0 && (
          <Link to={`/myCalendar/${userId}`}>
            <button>&rarr;</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
