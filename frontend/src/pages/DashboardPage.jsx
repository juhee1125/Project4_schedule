import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Sidebar from './Sidebar';

import '../css/DashboardPage.css';

import { useState, useEffect } from 'react';

const DashboardPage = () => {
    const [schedule, setSchedule] = useState([]);

    //db에 저장된 일정 불러오기
    const token = localStorage.getItem("token");
    useEffect(() => {
      fetch("http://localhost:8080/api/schedule/userschedule", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then(data => setSchedule(data))
        .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className='container'>
      <Sidebar />
      <div className='dashboarddiv'>
        <div className='Dcalendardiv'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            buttonText={{
                today: "오늘"
              }}
            events={schedule.map(s => ({
              title: s.title,
              start: `${s.startdate}T${s.starttime}`,
              end: `${s.enddate}T${s.endtime}`,
              color: s.color
            }))}
            eventContent={(arg) => (
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: arg.event.backgroundColor
                  }}
                />
              </div>
            )}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
            titleFormat={{ year: "numeric", month: "long" }}
            locale="kr"
            dayCellContent={(info) => {
              return info.date.getDate();
            }}
          />
        </div>
        <div className='schedulelistdiv'>
          <div className='schedulelistlabel'>일정 목록</div>
          {[...schedule]
          //날짜,시간 순 오름차순 정렬
          .sort((a, b) => {
            const dateCompare = a.startdate.localeCompare(b.startdate);
            if (dateCompare !== 0) return dateCompare
            return a.starttime.localeCompare(b.starttime)
          })
          .map((s, idx) => (
            <div className='schedulelistsubdiv'>
              <div className='schedulecolorbox' style={{backgroundColor:s.color}}></div>
              <div className='schedulelist'>
                <label className='datelabel'>{s.startdate} ~ {s.enddate}</label>
                <label className='titleTimelabel'>{s.title} {s.starttime} ~ {s.endtime}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
