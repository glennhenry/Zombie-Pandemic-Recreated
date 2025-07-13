import { useState } from "react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { FiEye, FiEyeOff } from "react-icons/fi";
import replaceClick from "../../../utils/replaceClick";
import { Checkbox } from "../../components/Checkbox";
import type { Account } from "../../../core/types/Account";

interface AuthProps {
  account?: Account | null;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

export default function Auth(props: AuthProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameAndEmail, setUsernameAndEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);

  const handleAuthFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      replaceClick(
        undefined,
        `validate form register: "${username}"-"${email}"-"${password}"`,
      );
    } else {
      replaceClick(
        undefined,
        `validate form login: "${usernameAndEmail}"-"${password}"`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">
        {props.account ? "Welcome back" : "Login/Register"}
      </h1>
      {props.account ? (
        <div className="flex flex-col gap-2">
          <p>
            <span className="emphasized">{props.account.username}</span>
            {" - "}
            <span className="emphasized">{props.account.email}</span>
          </p>
          <a href="/play" className="emphasized link">
            Play now!
          </a>
        </div>
      ) : (
        <form
          ref={props.formRef}
          onSubmit={handleAuthFormSubmit}
          className="flex flex-col items-center gap-3"
        >
          {isRegistering ? (
            <>
              <TextField
                placeholder="Email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-70"
              />
              <TextField
                placeholder="Username"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full max-w-70"
              />
            </>
          ) : (
            <TextField
              placeholder="Username or Email"
              value={usernameAndEmail}
              required={true}
              onChange={(e) => setUsernameAndEmail(e.target.value)}
              className="w-full max-w-70"
            />
          )}

          <TextField
            placeholder="Password"
            hide={hidePassword}
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            onToggleHide={() => setHidePassword(!hidePassword)}
            className="w-full max-w-70"
          >
            {hidePassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          </TextField>

          <div className="flex w-full max-w-70 justify-between">
            <Checkbox
              isChecked={keepLogin}
              onChecked={(e) => setKeepLogin(e.target.checked)}
            >
              <p>Keep logged in</p>
            </Checkbox>
            <a
              href="#"
              className="emphasized link"
              onClick={(_) =>
                replaceClick(
                  undefined,
                  "change login form to email only, create an alert, send an email",
                )
              }
            >
              Forgot password
            </a>
          </div>

          <div className="flex w-full max-w-80 flex-col justify-center gap-2">
            <Button
              type="submit"
              className="flex justify-center rounded-md bg-primary p-2 text-white hover:bg-primary/80 active:bg-primary/70"
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
              <a
                href="#"
                onClick={(_) =>
                  replaceClick(
                    undefined,
                    "Skip login, go directly into game with guest account",
                  )
                }
                className="emphasized link"
              >
                Play as Guest
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
