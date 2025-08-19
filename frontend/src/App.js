import { HashRouter, Route, Routes } from "react-router-dom";

import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import FindId from "./pages/FindIdPage";
import FindPw from "./pages/FindPwPage";
import Dashboard from "./pages/DashboardPage";
import Calendar from "./pages/CalendarPage";
import TokenRoute from "./TokenRoute";

import { useState } from "react";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

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
            <TokenRoute token={token}>
              <Dashboard />
            </TokenRoute>
          }
        />
        <Route
          path='/calendar'
          element={
            <TokenRoute token={token}>
              <Calendar />
            </TokenRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
