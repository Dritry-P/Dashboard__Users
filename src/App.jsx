import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import usersStore from "./store/userStore";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={usersStore.isAuth ? <Dashboard /> : <Login />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
