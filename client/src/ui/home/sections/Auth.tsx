import { useState } from "react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { FiEye } from "react-icons/fi";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <h1>Login/Register</h1>
      <TextField
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        placeholder="Password"
        hide={hidePassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onToggleHide={() => setHidePassword(!hidePassword)}
      >
        <FiEye size={18} />
      </TextField>
    </div>
  );
}
