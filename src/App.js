import logo from "./logo.svg";
import "./App.css";
import MyCalendar from "./components/MyCalendar";
import AddGoals from "./components/AddGoals";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Authethication from "./components/Authethication";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myCalendar/:id" element={<MyCalendar />} />
        <Route path="/authentication" element={<Authethication />} />
      <Route path="/Login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
