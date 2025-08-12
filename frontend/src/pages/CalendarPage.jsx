import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import "../css/CalendarPage.css"
import { useState, useEffect } from 'react';

const CalendarPage = () => {
  const [dateclick, setDateclick] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [topLabel, setTopLabel] = useState('');

  //날짜클릭
  const handleDateClick = (arg) => {
    setDateclick(arg.dateStr);
  };

  //카테고리 API (huggingface)
  useEffect(() => {
    if (!title || title.trim() === "") {
      console.log("입력값 없음")
      return;
    }

    const apiToken = process.env.REACT_APP_CALENDAR_API_TOKEN
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
        {
          headers: {
          Authorization: `Bearer ${apiToken}`,
                  "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }

    query({
        inputs: title,
        parameters: { candidate_labels: ["운동", "공부", "약속", "기념일", "직장"] }
    }).then((response) => {
        //가장 높은 확률의 label 추출
        const { labels, scores } = response;
        const maxIndex = scores.indexOf(Math.max(...scores));
        const topLabel = labels[maxIndex];
        setTopLabel(topLabel);
    });
  }, [title]);

  //카테고리 별 색
  let categorycolor = {
    운동: { color: "#ffb0b0" },
    공부: { color: "#ffbf70" },
    약속: { color: "#ffef9f" },
    기념일: { color: "#d6f3a7" },
    직장: { color: "#aec3f1" }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dateclick: ",dateclick);

    if (dateclick === ''){
      alert("날짜를 클릭해주세요")
      return
    }

    //카테고리 미수정 시 추천카테고리 전송
    const submitCategory = category === '' ? topLabel : category;
    
    const color = categorycolor[topLabel].color;
    console.log("submitCategory :",submitCategory, "color :",color)
    
    try {
      const token = localStorage.getItem("token");
      console.log("사용자토근",token)
      console.log("dateclick: ",dateclick);

      const responseschedule = await fetch("http://localhost:8080/api/schedule/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          //로그인 시 저장했던 토큰
          "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ sDate:dateclick, sTitle:title })
      });
      if(responseschedule.response===200){
        console.log("스케줄 등록 성공")
        return
      }
      const responsecategory = await fetch("http://localhost:8080/api/category/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ cCategory:submitCategory, cColor:color })
      });

      console.log("responseschedule :",responseschedule, " responsecategory :",responsecategory)

    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className='calendarP'>
      <div className='calendardiv'>
        <div className='fullcalendardiv'>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next",
            }}
            height="574"
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={[{ title: '회의', date: '2025-07-20' },{ title: '회의', date: '2025-07-20' },{ title: '회의', date: '2025-07-20' },
              { title: '회의', date: '2025-07-16' },{ title: '회의', date: '2025-07-16' },{ title: '회의', date: '2025-07-16' }
            ]}
            locale="kr"
            dayCellContent={(info) => {
              return info.date.getDate();
            }}
          />
        </div>
        <div>
          <form onSubmit={handleSubmit} className='loginform'>
            <label>일정</label>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder={topLabel ==='' ? "카테고리" : topLabel}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button>일정등록</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
