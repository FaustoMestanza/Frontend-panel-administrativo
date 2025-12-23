import Login from "./pages/Login";
import Panel from "./pages/Panel";

function App() {
  const token = localStorage.getItem("token");

  // SI NO HAY TOKEN → LOGIN
  if (!token) {
    return <Login />;
  }

  // SI HAY TOKEN → PANEL
  return <Panel />;
}

export default App;
