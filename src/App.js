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
import Single from "./Components/Single";
import { useNavigate } from "react-router-dom";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./firebase";

import { createContext } from "react";

export const UserContext = createContext({});

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  const handleSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch((err) => {
        alert(err);
      });
  };

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        navigate("/student/list");
      })
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

  const context = { user, handleSignOut };
  return (
    <div className="App-header">
      <UserContext.Provider value={context}>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={
              <Login handleLogin={handleLogin} handleSignup={handleSignup} />
            }
          />

          <Route path="/student/" element={<Student user={user} />}>
            <Route
              path="form"
              element={
                <RequireAuth redirectTo="/login" user={user}>
                  <Form user={user} />
                </RequireAuth>
              }
            />
            <Route
              path="list"
              element={<List selectCurrent={setCurrentStudent} />}
            />
            {/* Nested component */}
            {/* <Route
              path=":studentID"
              element={<Single student={currentStudent} />}
            />
          </Route>
        </Route> */}

            {/* Single component path nest url */}
            <Route
              path="list/:studentID"
              element={<Single student={currentStudent} />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
