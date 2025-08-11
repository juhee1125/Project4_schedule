import { Link } from 'react-router-dom';

import "../css/Sidebar.css"

const Sidebar = () => {
  return (
    <div className='sidediv'>
        <label className='titlelabel'>Make a Note</label>
        <div className=''>
            <Link to="/calendar">
            <button type="button" className=''>캘린더</button>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar
