import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/Login";
import Homepage from "./pages/homepage";
import PrivateRoute from "./components/privateRoutes";
import { useEffect } from "react";
import Bookstore from "./pages/bookstore";
import Profilepage from "./pages/profilepage";
import AdminPage from "./pages/Adminpage";
import AdminRoute from "./pages/adminRoute";
function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    
  };

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) setUser(storedUser);
}, []);


  return (
    <Router>
      {/* Optional: Add a shared Navbar here if needed */}
      {/* <Navbar /> */}

      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/admin" element={<AdminPage />} />
         <Route
          path="/bookstore"
          element={
            <PrivateRoute>
              <Bookstore />
            </PrivateRoute>
          }
          />
          <Route
          path="/profilepage"
          element={   <Profilepage /> }
          />


      </Routes>
    </Router>
  );
}

export default App;
