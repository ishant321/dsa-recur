import { Outlet } from "react-router-dom";
import DrNavBar from "../components/dr_navbar";

interface MainLayoutProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

function AppLayout({ setUser }: MainLayoutProps) {
  return (
    <>
      <DrNavBar setUser={setUser} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
