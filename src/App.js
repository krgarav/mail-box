import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./Component/Login";
import Mainpage from "./Component/Body/Mainpage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/mailbox" element={<Mainpage />} />}
        {!isLoggedIn && (
          <Route path="/mailbox" element={<Navigate to="/" replace={true} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
