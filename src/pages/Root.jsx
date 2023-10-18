import { Outlet } from "react-router-dom";
import Nav from "./../components/sections/Nav";
import { useAuth } from "../contexts/AuthContext";

function Root() {

  const { user } = useAuth();

  return (
    <>
      <Nav user={user} />
      <Outlet />
    </>
  );
}

export default Root;
