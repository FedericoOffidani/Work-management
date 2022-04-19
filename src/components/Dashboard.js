import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Dashboard() {
  const dispatch = useDispatch();
  return (
    <Container>
      <h1>Questa è la dashboard</h1>
      <div>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </Container>
  );
}

export default Dashboard;
