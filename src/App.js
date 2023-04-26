import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./Component/Login";
import Mainpage from "./Component/Body/Mainpage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Inbox from "./Component/Body/Inbox";
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/mailbox" element={<Mainpage />} />}
        {isLoggedIn && <Route path="/inbox" element={<Inbox />} />}
      </Routes>
    </div>
  );
};

export default App;
