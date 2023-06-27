import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/Error";
import Welcome from "./Pages/Welcome";
import Student from "./Pages/Student";
import Form from "./Pages/Form";
import Login from "./Pages/Login";
import List from "./Pages/List";
import Navbar from "./Components/Navbar";
import "./App.css";
import { Navigate } from "react-router-dom";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch((err) => {
        alert(err);
      });
  };

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch((err) => {
        alert(err);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Signout success woooo");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
    });
  }, []);

  function RequireAuth({ children, redirectTo, user }) {
    console.log(user);
    const isAuthenticated = isLoggedIn;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <div className="App-header">
      <BrowserRouter>
        <Navbar handleSignOut={handleSignOut} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={
              <Login handleLogin={handleLogin} handleSignup={handleSignup} />
            }
          />

          <Route path="/student" element={<Student user={user} />}>
            <Route
              path="form"
              element={
                <RequireAuth redirectTo="/login" user={user}>
                  <Form />
                </RequireAuth>
              }
            />
            <Route path="list" element={<List />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
