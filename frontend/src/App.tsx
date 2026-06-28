import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import type { User } from "./types";
import { useEffect, useState } from "react";
import { request } from "./api/request";
import AppLayout from "./layouts/app_layout";

function Dashboard() {
  return <div>Dashboard (later)</div>;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const getStoredUser = () => {
    const data = sessionStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const storedUser = getStoredUser();

    if (storedUser) {
      setUser({ email: storedUser.email, isAuthenticated: true });
    }
  }, []);

  useEffect(() => {
    if (!user?.isAuthenticated) {
      return;
    }

    const interval = setInterval(
      async () => {
        try {
          const storedUser = getStoredUser();

          if (!storedUser?.refreshToken || !storedUser?.token) return;

          const { email, refreshToken } = storedUser;

          const response: { data: { accessToken?: string } } = await request({
            method: "POST",
            url: "/refresh_token",
            payload: {
              refreshToken,
            },
          });

          const newToken = response.data.accessToken;

          if (!newToken) {
            throw new Error("No access token received");
          }
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              email: email,
              token: newToken,
              refreshToken: refreshToken,
            }),
          );
        } catch (error) {
          console.error("Refresh failed", error);

          sessionStorage.clear();
          setUser(null);
        }
      },
      14 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [user?.isAuthenticated]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user?.isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <Login setUser={setUser} />
          )
        }
      />

      <Route path="/signup" element={<Signup />} />

      {/* Protected Layout */}
      <Route
        element={
          user?.isAuthenticated ? (
            <AppLayout setUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Add more pages here */}
        {/* <Route path="/topics" element={<Topics />} /> */}
        {/* <Route path="/questions" element={<Questions />} /> */}
      </Route>
    </Routes>
  );
}
