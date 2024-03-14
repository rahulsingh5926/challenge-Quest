import logo from "./logo.svg";
import "./App.css";
import MyCalendar from "./components/MyCalendar";
import AddGoals from "./components/AddGoals";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <MyCalendar />
      <AddGoals /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MyCalendar" element={<MyCalendar />} />
      </Routes>
    </>
  );
}

export default App;
