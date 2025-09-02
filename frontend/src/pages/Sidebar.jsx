import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='w-[10%] pt-3 bg-[#ffea82] text-center'>
        <label className='text-5xl'>Make a Note</label>
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <div className={isActive ? "items-center bg-white p-3 rounded-[35px_0_0_35px] mt-10 ml-5" : "items-center bg-transparent p-3 rounded-[35px_0_0_35px] mt-10 ml-5"}>
              <button type="button" className={isActive ? "font-meetme text-xl text-[#333] bg-white border-none p-[10px_20px_10px_0] cursor-pointer" : "font-meetme text-xl text-[#333] bg-transparent border-none p-[10px_20px_10px_0] cursor-pointer"}>
                대시보드
              </button>
            </div>
          )}
        </NavLink>
        <NavLink to="/calendar">
          {({ isActive }) => (
            <div className={isActive ? "items-center bg-white p-3 rounded-[35px_0_0_35px] mt-5 ml-5" : "items-center bg-transparent p-3 rounded-[35px_0_0_35px] mt-5 ml-5"}>
              <button type="button" className={isActive ? "font-meetme text-xl text-[#333] bg-white border-none p-[10px_20px_10px_0] cursor-pointer" : "font-meetme text-xl text-[#333] bg-transparent border-none p-[10px_20px_10px_0] cursor-pointer"}>
                캘린더
              </button>
            </div>
          )}
        </NavLink>
    </div>
  )
}

export default Sidebar
