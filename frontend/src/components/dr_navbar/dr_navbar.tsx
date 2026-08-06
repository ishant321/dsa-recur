import React, { useEffect } from "react";
import DrButton from "../dr_button";
import DrTabs from "../dr_tabs";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function DrNavBar({ setUser }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabData = [
    { label: "Home", id: "home" },
    { label: "Dashboard", id: "dashboard" },
  ];
  const [activeTab, setActiveTab] = React.useState(
    location.pathname.replace("/", "") === "dashboard"
    ? "dashboard"
    : "home"
  );

  const handleLogout = () => {
    sessionStorage.clear(); // removes token + user + everything

    setUser(null); // resets React state

    window.location.href = "/login"; // force redirect
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  useEffect(() => {
    setActiveTab(location.pathname.replace("/", "") === "dashboard"
    ? "dashboard"
    : "home");
  }, [location.pathname]);

  return (
    <div>
      <div className="flex flex-row p-4 items-center justify-between">
        <div style={{ flex: 1 }} />
        <DrTabs
          style={{ width: "20%" }}
          tabs={tabData}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <DrButton variant="danger" onClick={handleLogout}>
            Logout
          </DrButton>
        </div>
      </div>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--border)",
        }}
      />
    </div>
  );
}
