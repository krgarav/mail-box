import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./Component/Login";
import Mainpage from "./Component/Body/Mainpage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mailbox" element={<Mainpage />} />
      </Routes>
    </div>
  );
};

export default App;
