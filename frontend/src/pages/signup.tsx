import { useState } from "react";
import DrText from "../components/dr_text";
import DrButton from "../components/dr_button";
import DrTextInput from "../components/dr_text_input";
import { validateEmail, validatePassword } from "../utils";
import { request } from "../api/request";
import Swal from "sweetalert2";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetLoadingKey, setResetLoadingKey] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!validateEmail(email).isValid || !validatePassword(password).isValid) {
      return;
    }
    try {
      await request({
          method: "POST",
          url: "/register",
          payload: {
            email,
            password,
          },
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Signup successful",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: message,
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setResetLoadingKey(v4());
    }
  };

  const isBtnEnabled =
    !emailError &&
    !passwordError &&
    email.trim() !== "" &&
    password.trim() !== "";

  return (
    <div className="flex h-full center flex-1 w-full">
      {/* ================= LEFT SIDE ================= */}
      <div className="flex-1 center p-12" style={{ width: "50%" }}>
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
      <div
        className="flex flex-col flex-center items-center"
        style={{ width: "50%" }}
      >
        <div className="flex flex-col gap-4 p-12 w-half">
          <DrText variant="h1" className="mb-2">
            Sign up
          </DrText>

          <div className="flex flex-col gap-4">
            <DrTextInput
              label="Email"
              value={email}
              onChange={(value) => {
                setEmail(value);

                const { error } = validateEmail(email);

                setEmailError(error);
              }}
              placeholder="Enter email"
              error={!!emailError}
              errorMessage={emailError}
            />

            <DrTextInput
              label="Password"
              type="password"
              value={password}
              onChange={(value) => {
                setPassword(value);

                const { error } = validatePassword(password);

                setPasswordError(error);
              }}
              placeholder="Enter password"
              error={!!passwordError}
              errorMessage={passwordError}
            />

            <DrButton
              fullWidth
              onClick={handleSignup}
              disabled={!isBtnEnabled}
              className="mt-2"
              resetLoadingKey={resetLoadingKey}
            >
              Sign Up
            </DrButton>
          </div>
        </div>
      </div>
    </div>
  );
}
