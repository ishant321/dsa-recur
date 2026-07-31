import { useState } from "react";
import DrText from "../components/dr_text";
import DrButton from "../components/dr_button";
import DrTextInput from "../components/dr_text_input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { request } from "../api/request";
import { v4 } from "uuid";
import { validateEmail, validatePassword } from "../utils";

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetLoadingKey, setResetLoadingKey] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!validateEmail(email).isValid || !validatePassword(password).isValid) {
      return;
    }
    try {
      const response: { data: { token?: string; refreshToken?: string } } =
        await request({
          method: "POST",
          url: "/login",
          payload: {
            email,
            password,
          },
        });
      console.log("Login response:", response);
      const token = response?.data?.token;
      const refreshToken = response?.data?.refreshToken;
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          token: token,
          refreshToken: refreshToken,
        }),
      );
      if (token) {
        setUser({ email: email, isAuthenticated: true });
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login successful",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";

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
            Login
          </DrText>

          <div className="flex flex-col">
            <DrTextInput
              label="Email"
              value={email}
              onChange={(value) => {
                setEmail(value);

                const { error } = validateEmail(value);

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

                const { error } = validatePassword(value);

                setPasswordError(error);
              }}
              placeholder="Enter password"
              error={!!passwordError}
              errorMessage={passwordError}
            />

            <DrButton
              fullWidth
              onClick={handleLogin}
              disabled={!isBtnEnabled}
              className="mt-2"
              resetLoadingKey={resetLoadingKey}
            >
              Login
            </DrButton>

            <DrText variant="body" className="text-muted text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign up
              </a>
            </DrText>
          </div>
        </div>
      </div>
    </div>
  );
}
