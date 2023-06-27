import { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <p>Login</p>
      <label>Email</label>
      <input
        value={email}
        name="email"
        type="text"
        placeholder="email here please"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        value={password}
        name="password"
        type="text"
        placeholder="password here please"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => props.handleLogin(email, password)}>Login</button>
      <button onClick={() => props.handleSignup(email, password)}>
        Signup
      </button>
    </div>
  );
}
