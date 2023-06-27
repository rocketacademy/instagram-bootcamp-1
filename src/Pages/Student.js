import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Student() {
  return (
    <div>
      <div>
        <Link to="/student/form">Form</Link>
        <Link to="/student/list">List</Link>
      </div>
      <p>Use the nav bar to get the right component</p>
      <Outlet />
    </div>
  );
}
