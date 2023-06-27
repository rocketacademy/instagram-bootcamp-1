import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/student">Student</Link>
      {props.isLoggedIn ? (
        <button onClick={props.handleSignOut}>Logout</button>
      ) : null}
    </div>
  );
}
