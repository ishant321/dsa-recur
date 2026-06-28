import React, { useEffect } from "react";
import DrButton from "../dr_button";
import DrTabs from "../dr_tabs";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function DrNavBar({ setUser }: NavbarProps) {
  const navigate = useNavigate();
  const tabData = [
    { label: "Home", id: "home" },
    { label: "Dashboard", id: "dashboard" },
  ];
  const [activeTab, setActiveTab] = React.useState("home");

  const handleLogout = () => {
    sessionStorage.clear(); // removes token + user + everything

    setUser(null); // resets React state

    window.location.href = "/login"; // force redirect
  };

  useEffect(() => {
    // This effect runs whenever the activeTab changes
    navigate(`/${activeTab}`); // Navigate to the new route based on the active tab
  }, [activeTab]);

  return (
    <div>
      <div className="flex flex-row p-4 items-center justify-between">
        <div style={{ flex: 1 }} />
        <DrTabs
          style={{ width: "20%" }}
          tabs={tabData}
          activeTab={activeTab}
          onChange={setActiveTab}
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
