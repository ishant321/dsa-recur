import { Outlet } from "react-router-dom";
import DrNavBar from "../components/dr_navbar";

interface MainLayoutProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

function AppLayout({ setUser }: MainLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <DrNavBar setUser={setUser} />
      <main className="flex flex-1" style={{ minHeight: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
