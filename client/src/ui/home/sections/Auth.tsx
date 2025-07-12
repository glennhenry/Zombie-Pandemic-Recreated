import { useState } from "react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { FiEye } from "react-icons/fi";
import replaceClick from "../../../utils/replaceClick";
import { Checkbox } from "../../components/Checkbox";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Login/Register</h1>
      <div className="flex flex-col items-center gap-3">
        {isRegistering && (
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-70"
          />
        )}
        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full max-w-70"
        />

        <TextField
          placeholder="Password"
          hide={hidePassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onToggleHide={() => setHidePassword(!hidePassword)}
          className="w-full max-w-70"
        >
          <FiEye size={18} />
        </TextField>
        <div className="flex w-full max-w-70 justify-between">
          <Checkbox
            isChecked={keepLogin}
            onChecked={(e) => setKeepLogin(e.target.checked)}
          >
            <p>Keep logged in</p>
          </Checkbox>
          <a href="#" className="emphasized link" onClick={replaceClick}>
            Forgot password
          </a>
        </div>
        <div className="flex w-full max-w-80 flex-col justify-center gap-2">
          <Button
            className="flex justify-center rounded-md p-2"
            onClick={replaceClick}
          >
            <p className="text-lg">{isRegistering ? "Register" : "Login"}</p>
          </Button>
          <p>
            <a
              href="#"
              onClick={(_) => setIsRegistering(!isRegistering)}
              className="emphasized link"
            >
              {isRegistering ? "Login" : "Register"}
            </a>{" "}
            or{" "}
            <a href="#" onClick={replaceClick} className="emphasized link">
              Play as Guest
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
