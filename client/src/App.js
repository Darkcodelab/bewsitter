import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Provider
import { Provider } from "./context/Context";

// components
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Provider>
        <div className="container">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </Router>
        </div>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
