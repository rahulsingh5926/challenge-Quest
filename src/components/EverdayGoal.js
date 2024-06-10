import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

function EverydayGoal(props) {
  let st;
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);

  const a = collection(db, `${props.id}_everydayGoal`);

  const getGoals = async (props) => {  
    const data = await getDocs(a);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),      
      id: doc.id,
    }));
    setList(filteredData);
  };
  const deleteContent = async (id) => {
    const text = doc(db, `${props.id}_everydayGoal`, id);
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
          minHeight: "312px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
        }}
        className="d-flex align-items-center  flex-column"
      >
        <h5 className="">Add Everyday Goal</h5>
        <div className="d-flex ">
          <textarea
            rows="1"
            cols="29"
            wrap="soft"
            type="text"
            placeholder="enter your goal....."
            value={content}
            style={{
              border: "2px solid green",
              borderRadius: "5px 0px 0px 5px",
            }}
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
                    wordWrap: "break-word",
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

export default EverydayGoal;
