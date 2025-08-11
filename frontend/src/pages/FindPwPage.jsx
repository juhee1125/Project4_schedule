import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../css/FindPwPage.css';

const FindPwPage = () => {
    const [verifyId, setVerifyId] = useState(false);
    const [mId, setMId] = useState('');
    const [newmPw, setNewmPw] = useState('');
    const [newmPwCheck, setNewmPwCheck] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [pwMessage, setPwMessage] = useState('');

    //비밀번호찾기(아이디확인)
    const handleVerifyId = async (e) => {
      e.preventDefault();

      if (mId === ""){
        setIdMessage("아이디를 입력해주세요");
        return
      }

      try {
        const response = await fetch("http://localhost:8080/api/user/verifyID", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mId })
        });
        console.log(response)
        if (response.ok) {
          setVerifyId(true)
        } else {
          setIdMessage("일치하는 아이디가 없습니다");
        }
      } catch (error) {
      console.error("로그인 오류:", error);
      }
    };

    //비밀번호 정규식
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
      return regex.test(password);
    };
    //비밀번호 확인
    useEffect(() => {
      if (newmPw === "") {
        setPwMessage("");
        return;
      }

      if (!validatePassword(newmPw)) {
        setPwMessage("비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.");
      } else if (newmPwCheck === "") {
        setPwMessage("");
      }
      else if (newmPw !== newmPwCheck) {
        setPwMessage("비밀번호가 일치하지 않습니다.");
      } else {
        setPwMessage("비밀번호가 일치합니다.");
      }
    }, [newmPw, newmPwCheck]);

    //비밀번호찾기(비밀번호변경)
    const handlechangePw = async (e) => {
      e.preventDefault();

      if (pwMessage !== "비밀번호가 일치합니다.") {
        alert("비밀번호를 확인해주세요");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/user/changePW", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mId, newmPw })
        });

        if (response.ok) {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          setVerifyId(false);
        }
      } catch (error) {
      console.error("로그인 오류:", error);
      }
    };

  return (
    <>
      {!verifyId ? 
        (<div className='findPWP'>
          <form onSubmit={handleVerifyId} className='findPWform'>
            <label className='loginlabel'>비밀번호찾기</label>
            <input
                type="text"
                placeholder="ID"
                value={mId}
                onChange={(e) => setMId(e.target.value)}
            />
            <label className='findIdlabel'>{idMessage}</label>
            <button type="submit" className='loginbutton'>확인</button>
            </form>
            <div className='linkcontainer'>
                <Link to="/signup">
                    <button type="button" className='linkbutton'>회원가입</button>
                </Link>
                <Link to="/">
                    <button type="button" className='linkbutton'>로그인</button>
                </Link>
            </div>
        </div>)
        : 
        (<div className='findPWP'>
          <form onSubmit={handlechangePw} className='findPWform'>
          <label className='loginlabel'>비밀번호변경</label>
          <input
              type="password"
              placeholder="PW"
              value={newmPw}
              onChange={(e) => setNewmPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="* 비밀번호 확인"
            value={newmPwCheck}
            onChange={(e) => setNewmPwCheck(e.target.value)}
          />
          <label className='pwnotice'>영문, 숫자, 특수문자 포함 8글자 이상 기재해주세요</label>
          <label className='findIdlabel'>{pwMessage}</label>
          <button type="submit" className='loginbutton'>변경</button>
          </form>
          {/* <div className='linkcontainer'>
              <Link to="/">
                  <button type="button" className='linkbutton'>로그인</button>
              </Link>
          </div> */}
      </div>)
      }
    </>
  )
}

export default FindPwPage
