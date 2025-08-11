import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Sidebar from './Sidebar';

import '../css/DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className='dashboarddiv'>
      <Sidebar />
      <div className='fullcalendardiv'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[{ title: '회의', date: '2025-07-20' }]}
        />
      </div>
    </div>
  )
}

export default DashboardPage
