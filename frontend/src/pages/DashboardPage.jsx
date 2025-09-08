import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useState, useEffect } from 'react';

import Sidebar from './Sidebar';

import '../css/DashboardPage.css';

const DashboardPage = () => {
    const [schedule, setSchedule] = useState([]);
    const [currentStartDate, setCurrentStartDate] = useState(new Date());
    const [currentEndDate, setCurrentEndDate] = useState(new Date());

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

    
    //달력변경에 따른 일정목록, 통계그래프 변경
    const handleDatesSet = (dateInfo) => {
      setCurrentStartDate(dateInfo.start);
      setCurrentEndDate(dateInfo.end);
    };
    const filteredSchedule = schedule.filter(s => {
      const scheduleDate = new Date(s.startdate);
      return scheduleDate >= currentStartDate && scheduleDate < currentEndDate;
    });

    //월별 카테고리 통계 그래프
    //이번 달 데이터만 필터링
    const categoryCount = filteredSchedule.reduce((acc, cur) => {
      if (!acc[cur.category]) acc[cur.category] = { count: 0, color: cur.color };
      acc[cur.category].count += 1;
      return acc;
    }, {});

    const chartData = Object.entries(categoryCount).map(([category, { count, color }]) => ({
        category,
        count,
        color
      }))

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, count }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
      const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

      return (
        <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
           {count}개
        </text>
      );
    };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-1 p-5' id='dashboarddiv'>
        {/* 캘린더 */}
        <div className='mr-5'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            buttonText={{
                today: "오늘"
              }}
            events={schedule.map(s => ({
              id: s.snum,
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
            datesSet={handleDatesSet}
          />
        </div>
        {/* 일정목록 */}
        <div className='bg-[#fffae1] rounded-[20px] w-[250px] h-[460px] p-5 text-center mr-5'>
          <div className='text-xl font-semibold mb-3'>일정 목록</div>
          {filteredSchedule
            //날짜,시간 순 오름차순 정렬
            .sort((a, b) => {
              const dateCompare = a.startdate.localeCompare(b.startdate);
              if (dateCompare !== 0) return dateCompare
              return a.starttime.localeCompare(b.starttime)
            })
            .map((s) => (
              <div className='flex items-center text-left'>
                <div className='w-2.5 h-9' style={{backgroundColor:s.color}}></div>
                <div className='flex flex-col p-3 rounded-[20px]'>
                  <label className='opacity-90'>{s.startdate} ~ {s.enddate}</label>
                  <label className='text-lg'>{s.title} {s.starttime} ~ {s.endtime}</label>
                </div>
              </div>
            ))
          }
        </div>
        {/* 월별통계 */}
        <div className='bg-[#fffae1] rounded-[20px] h-[500px]'>
          <label></label>
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={130}
              paddingAngle={3}
              dataKey="count"
              nameKey="category"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {chartData.map((item, index) => (
                <Cell key={index} fill={item.color}/>
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
