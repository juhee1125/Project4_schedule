import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

//날짜 포멧
import dayjs from "dayjs";
//시간 포멧
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../css/CalendarPage.css"
import Sidebar from './Sidebar';
import { useState, useEffect, useRef } from 'react';

const CalendarPage = () => {
  const [title, setTitle] = useState('');
  const [debouncedTitle, setDebouncedTitle] = useState(title);
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [starttime, setStarttime] = useState(null);
  const [endtime, setEndtime] = useState(null);
  const [category, setCategory] = useState('');
  const [topLabel, setTopLabel] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [timetoggle, setTimetoggle] = useState(false);
  
  const calendarRef = useRef(null);

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

  //카테고리 API (huggingface)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500);

    return () => clearTimeout(handler);
  }, [title]);

  useEffect(() => {
    if (!debouncedTitle || debouncedTitle.trim() === "") return;

    fetch("http://localhost:8081/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: title,
        parameters: { candidate_labels: ["운동", "공부", "약속", "기념일", "직장", "여행"] }
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.labels || !data.scores) {
          console.error("API 응답 오류", data);
          return;
        }

        //가장 높은 확률의 label 추출
        const { labels, scores } = data;
        const maxIndex = scores.indexOf(Math.max(...scores));
        const topLabel = labels[maxIndex];
        setTopLabel(topLabel);
      })
      .catch(err => console.error("Fetch 실패:", err));
  }, [debouncedTitle]);

  //카테고리 별 색
  let categorycolor = {
    운동: { color: "#ffb0b0" },
    공부: { color: "#ffbf70" },
    약속: { color: "#ffef9f" },
    기념일: { color: "#d6f3a7" },
    직장: { color: "#aec3f1" },
    여행: { color: "#d9b2f3ff" }
  };

  //날짜
  const handleStartChange = (time) => {
    setStarttime(time);
  };
  const handleEndChange = (time) => {
    setEndtime(time);
  };
  const startKST = dayjs(starttime).format("HH:mm");
  const endKST = dayjs(endtime).format("HH:mm");

  //사이드바
  const openSidebar = () => {
    setIsOpen(true);
    setTimeout(() => window.dispatchEvent(new Event("resize")), 310);
  };
  const closeSidebar = () => {
    setIsOpen(false);
    setTimeout(() => window.dispatchEvent(new Event("resize")), 310);
  };

  //시간토글(하루종일)
  const togglestate = () => {
    if (startdate === '' || enddate === '') {
      alert("날짜를 골라주세요")
      
      return
    }
    if (!timetoggle) {
      setTimetoggle(true)

      const starttimetoggle = new Date(`${startdate}T00:00:00`);
      const endtimetoggle = new Date(`${enddate}T23:59:59`);
      setStarttime(starttimetoggle);
      setEndtime(endtimetoggle);

      return
    }
    if (timetoggle) {
      setTimetoggle(false)

      return
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (startdate === ''){
      alert("날짜를 클릭해주세요")
      return
    }
    if (title === ''){
      alert("일정을 입력해주세요")
      return
    }
    if (starttime === '' || endtime === ''){
      alert("시간을 선택해주세요")
      return
    }

    //카테고리 미수정 시 추천카테고리 전송
    const submitCategory = category === '' ? topLabel : category;
    
    //추천카테고리 리스트에 없는 카테고리 입력 시 랜덤 색 저장
    let color =""
    if (topLabel !== "운동" && topLabel !== "공부" && topLabel !== "약속" && topLabel !== "기념일" && topLabel !== "직장" && topLabel !== "여행") {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      color = `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } else{
      color = submitCategory === topLabel ? categorycolor[topLabel].color : categorycolor[category].color;
    }
    
    try {
      const responseCategorySchedule = await fetch("http://localhost:8080/api/connect", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ sStartdate:startdate, sEnddate:enddate, sTitle:title, sStarttime: startKST, sEndtime: endKST, cCategory:submitCategory, cColor:color })
      });
    
      if(responseCategorySchedule.status===200){
        alert("스케줄 등록 성공")
        window.location.reload()

        return
      }

    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full z-[999]"
          onClick={closeSidebar}
        />
      )}
      <div className="flex flex-1 flex-col">
        <div className='p-[0_35px_35px_35px] bg-white' id='calendardiv'>
          <div className='flex flex-1 justify-center'>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev",
                center: "title",
                right: "next today addEventButton",
              }}
              buttonText={{
                today: "오늘"
              }}
              height="100%"
              initialView="dayGridMonth"
              selectable={true}
              selectMirror={false}
              //날짜 선택(다중선택 가능)
              select={(info) => {
                document.querySelectorAll(".fc-daygrid-day").forEach((el) => {
                  el.style.background = "";
                });
                
                let current = dayjs(info.start);
                while (current.isBefore(info.end, "day")) {
                  const dateStr = current.format("YYYY-MM-DD");
                  const cell = document.querySelector(`[data-date='${dateStr}']`);
                  if (cell) cell.style.background = "#ffea82";
                  current = current.add(1, "day");
                }

                setStartdate(info.startStr);
                setEnddate(dayjs(info.end).subtract(1, "day").format("YYYY-MM-DD"));
              }}
              events={schedule.map(s => ({
                title: s.title,
                start: `${s.startdate}T${s.starttime}`,
                end: `${s.enddate}T${s.endtime}`,
                color: s.color
              }))}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              }}
              titleFormat={{ year: "numeric", month: "long" }}
              dayHeaderFormat={{ weekday: "long" }}
              locale="kr"
              dayCellContent={(info) => {
                return info.date.getDate();
              }}
              //일정 추가
              customButtons={{
                addEventButton: {
                  text: "등록",
                  click: openSidebar,
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'w-[400px]' : 'w-0'} flex justify-center overflow-hidden bg-white shadow-[-2px_0_5px_rgba(0,0,0,0.2)] transition-[width] duration-300 ease-in-out z-[1000]`}>
        <form onSubmit={handleSubmit} className='p-6 text-center'>
          <div className='text-3xl mb-8'>
            <label>일정등록</label>
          </div>
          <div>
            <input
              className='mb-6 border-none bg-[#f5f5f5] p-2.5 w-[100%]'
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />  
          </div>   
          <div>
            <input
              className='mb-6 border-none bg-[#f5f5f5] p-2.5 w-[100%]'
              type="text"
              placeholder={topLabel ==='' ? "카테고리" : topLabel}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>  
          <div className='flex'>
            <DatePicker
              selected={starttime}
              onChange={handleStartChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="시작"
              dateFormat="HH:mm"
              placeholderText="시작시간"
              className={`${timetoggle ? 'bg[#dbdbdb]' : ''} justify-center mb-6 border-none bg-[#f5f5f5] p-2.5 !w-[125px] mr-8`}
              id='timeinput'
              disabled={timetoggle}
            />
            <DatePicker
              selected={endtime}
              onChange={handleEndChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="종료"
              dateFormat="HH:mm"
              placeholderText="종료시간"
              className={`${timetoggle ? 'bg[#dbdbdb]' : ''} justify-center mb-6 border-none bg-[#f5f5f5] p-2.5 !w-[125px] ml-8`}
              id='timeinput'
              disabled={timetoggle}
            />
          </div>
          <div className='flex justify-end items-center text-lg -mt-3'>
            <div className={`${timetoggle ? 'justify-start' : 'justify-end'} flex items-center w-[70px] h-8 rounded-3xl bg-[#f5f5f5] p-1 mr-4`}>
              <div className={`${timetoggle ? 'bg-[#ffea82]' : 'bg-[#8d8d8d]'} w-6 h-6 rounded-2xl`} onClick={()=>togglestate()}></div>
            </div>
            <label>하루종일</label>
          </div>
          <button className='bg-[#ffea82] border-none rounded-xl font-meetme text-2xl text-[#333] w-[100%] p-[10px_0] mt-12'>등록</button>
        </form>
      </div>
    </div>
  )
}

export default CalendarPage
