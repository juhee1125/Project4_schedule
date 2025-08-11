import { HashRouter, Route, Routes } from "react-router-dom";

import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import FindId from "./pages/FindIdPage";
import FindPw from "./pages/FindPwPage";
import Dashboard from "./pages/DashboardPage";
import Calendar from "./pages/CalendarPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path='/'
          element={
              <Login />
          }
        />
        <Route
          path='/signup'
          element={
              <Signup />
          }
        />
        <Route
          path='/findID'
          element={
              <FindId />
          }
        />
        <Route
          path='/findPW'
          element={
              <FindPw />
          }
        />
        <Route
          path='/dashboard'
          element={
              <Dashboard />
          }
        />
        <Route
          path='/calendar'
          element={
              <Calendar />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
