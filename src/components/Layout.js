import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Layout() {
  const auth = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <Navbar expand="lg" className="mx-3">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/employees">Impiegati</Nav.Link>
        <Nav.Link href="/customers">Clienti</Nav.Link>
        <Nav.Link href="/services">Servizi</Nav.Link>
        {/* <Nav.Link href="/scheduler">Appuntamenti</Nav.Link> */}
        <Nav.Link href="/scheduler">Appuntamenti</Nav.Link>
        {!auth ? (
          <div>
            <Nav.Link href="/login">Login</Nav.Link>
          </div>
        ) : null}
      </Navbar>

      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
