import { useState } from "react";
import DrText from "../components/dr_text";
import DrButton from "../components/dr_button";
import DrTextInput from "../components/dr_text_input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
  };

  return (
    <div className="flex h-full center flex-1 w-full">

      {/* ================= LEFT SIDE ================= */}
      <div className="flex-1 center p-12" style={{width: "50%"}}>
        <div className="max-w-md">

          <DrText variant="h1" className="mb-4">
            DSA Recur
          </DrText>

          <DrText variant="title" className="text-muted mb-6">
            Structure your DSA learning properly
          </DrText>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex flex-col flex-center items-center" style={{width: "50%"}}>

        <div className="flex flex-col gap-4 p-12 w-half">
          <DrText variant="h1" className="mb-2">
            Sign up
          </DrText>

          <div className="flex flex-col gap-4">

            <DrTextInput
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Enter email"
            />

            <DrTextInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
            />

            <DrButton fullWidth onClick={handleLogin}>
              Sign Up
            </DrButton>

          </div>
        </div>

      </div>

    </div>
  );
}