import { NavLink } from "react-router-dom";

import "../css/Sidebar.css";

const Sidebar = () => {
  return (
    <div className='sidediv'>
        <label className='titlelabel'>Make a Note</label>
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <div className={isActive ? "calendarBdiv active" : "calendarBdiv"}>
              <button type="button" className={isActive ? "calendarB active" : "calendarB"}>
                대시보드
              </button>
            </div>
          )}
        </NavLink>
        <NavLink to="/calendar">
          {({ isActive }) => (
            <div className={isActive ? "calendarBdiv active" : "calendarBdiv"}>
              <button type="button" className={isActive ? "calendarB active" : "calendarB"}>
                캘린더
              </button>
            </div>
          )}
        </NavLink>
    </div>
  )
}

export default Sidebar
