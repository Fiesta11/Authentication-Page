import React, { useState } from "react";
import Home from "./components/homepage/home";
import Register from "./components/regpage/reg";
import Login from "./components/loginpage/login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"

function App() {
  const [user, setLoginUser] = useState({});

  // Your login logic that sets the user state variable

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user && user._id ? <Home setLoginUser = {setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
