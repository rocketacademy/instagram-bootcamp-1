import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Navbar(props) {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <h2>Welcome {user.user.email ? user.user.email : "Stranger"}</h2>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/student">Student</Link>
      {props.isLoggedIn ? (
        <button onClick={user.handleSignOut}>Logout</button>
      ) : null}
    </div>
  );
}
