import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AddGoals() {
  let st;
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);

  const a = collection(db, "monthyGoal");

  const getGoals = async () => {
    const data = await getDocs(a);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setList(filteredData);
  };
  const deleteContent = async (id) => {
    const text = doc(db, "monthyGoal", id);
    await deleteDoc(text);
    getGoals();
  };
  useEffect(() => {
    getGoals();
  }, []);
  const onSubmitContent = async () => {
    if (content) {
      await addDoc(a, {
        text: content,
      });
    }
    getGoals();
  };
  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
      }}
      className="my-2 "
    >
      <div
        style={{
          width: "400px",
          minHeight: "300px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
        }}
        className="d-flex align-items-center  flex-column"
      >
        <h5 className="">Add Monthy Goal</h5>
        <div className="d-flex ">
          <input
            style={{ width: "250px", cursor: "pointer" }}
            type="text"
            className="form-control "
            placeholder="enter your goal....."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button2
            onClick={() => {
              // if (content) setList((prevList) => [...prevList, content]);
              onSubmitContent();
              setContent("");
            }}
          >
            ADD GOAL
          </button2>
        </div>
        {list &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  margin: "3px",
                }}
                className="d-flex"
              >
                <div
                  style={{
                    width: "310px",

                    padding: "5px",
                    border: "2px solid green",
                    borderRadius: "5px 0px 0px 5px",
                    color: "green",
                  }}
                >
                  {item.text.toUpperCase()}
                </div>
                <button
                  onClick={() => deleteContent(item.id)}
                  style={{ borderRadius: " 0 5px 5px 0" }}
                >
                  <img src="/dustbin.png" width={30}></img>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AddGoals;
