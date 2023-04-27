import React from "react";
import { Routes, Route } from "react-router";
import Login from "./Component/Login";
import Composepage from "./Component/Body/Composepage";
import { useSelector } from "react-redux";
import Inbox from "./Component/Body/Inbox";
import "./App.css";
const MailPage = React.lazy(() => import("./Component/Body/Mailpage"));
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/mailbox" element={<Composepage />} />}
        {isLoggedIn && <Route path="/inbox" element={<Inbox />} />}
        {isLoggedIn && (
          <Route
            path="/inbox/:item"
            element={
              <React.Suspense fallback="Loading...">
                <MailPage />
              </React.Suspense>
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
