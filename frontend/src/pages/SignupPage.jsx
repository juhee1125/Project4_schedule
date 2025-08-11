import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../css/SignupPage.css';

function SignupPage() {
    const [mName, setMName] = useState('');
    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    const [mPwCheck, setMPwCheck] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [mEmail, setMEmail] = useState('');
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [idMessage, setIdMessage] = useState('');
    const [pwMessage, setPwMessage] = useState('');

    const navigate = useNavigate();

    //아이디 수정 시 중복확인 반복
    useEffect(()=>{
      setIsIdChecked(false);
    }, [mId])

    //아이디 중복확인 함수
    const checkDuplicateId = async () => {
      if (!mId.trim()) {
        setIdMessage("아이디를 입력해주세요");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/user/checkId?mId=${mId}`);
        const data = await response.json();

        //아이디 중복확인 체크여부
        setIsIdChecked(true);

        if (data.exists) {
          setIdMessage("이미 사용 중인 아이디입니다");
        } else {
          setIdMessage("사용 가능한 아이디입니다");
        }
      } catch (error) {
        console.error("중복 확인 오류", error);
        alert("중복 확인 중 오류가 발생했습니다.");
      }
    };

    //비밀번호 정규식
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
      return regex.test(password);
    };
    //비밀번호 확인
    useEffect(() => {
      if (mPw === "") {
        setPwMessage("");
        return;
      }

      if (!validatePassword(mPw)) {
        setPwMessage("비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.");
      } else if (mPwCheck === "") {
        setPwMessage("");
      }
      else if (mPw !== mPwCheck) {
        setPwMessage("비밀번호가 일치하지 않습니다.");
      } else {
        setPwMessage("비밀번호가 일치합니다.");
      }
    }, [mPw, mPwCheck]);

    //핸드폰번호 화면처리
    const formatPhone = (phone) => {
      const cleaned = phone.replace(/\D/g, "");
      //앞이 02일 때
      if (cleaned.startsWith("02")) {
        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 5)
          return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
        if (cleaned.length <= 9)
          return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}`;
      } else {
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 7)
          return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (mName==="" || mPw==="" || mPhone===""){
        alert("빈칸을 채워주세요");
        return;
      }

      if (!isIdChecked) {
        alert("아이디 중복확인을 해주세요");
        return;
      }

      if (pwMessage !== "비밀번호가 일치합니다.") {
        alert("비밀번호를 확인해주세요");
        return;
      }

      try {
        //서버에 회원가입 요청
        const response = await fetch('http://localhost:8080/api/user/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mName, mId, mPw, mPhone, mEmail })
        });
        
        if (response.ok) {
          navigate("/");
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('에러 발생');
      }
    };

  return (
    <div className='signupP'>
      <form onSubmit={handleSubmit} className='signupform'>
        <label className='signuplabel'>회원가입</label>
        <input
          className="nameinput"
          type="text"
          placeholder="* 성명"
          value={mName}
          onChange={(e) => setMName(e.target.value)}
        />
        <div className='idcontainer'>
          <input
            type="text"
            placeholder="* 아이디"
            value={mId}
            onChange={(e) => setMId(e.target.value)}
          />
          <button type="button" onClick={checkDuplicateId} className='duplicatebutton'>중복확인</button>
        </div>
        <div className="idpwcontainer">
          <label className="idlabel">
            {idMessage ? idMessage : ""}
          </label>
        </div>
        <input
          type="password"
          placeholder="* 비밀번호"
          value={mPw}
          onChange={(e) => setMPw(e.target.value)}
        />
        <input
          type="password"
          placeholder="* 비밀번호 확인"
          value={mPwCheck}
          onChange={(e) => setMPwCheck(e.target.value)}
        />
        <label className='pwnotice'>영문, 숫자, 특수문자 포함 8글자 이상 기재해주세요</label>
        <div className="idpwcontainer">
          <label className="pwlabel">
            {pwMessage}
          </label>
        </div>
        <input
          type="text"
          placeholder="* 휴대폰번호"
          value={formatPhone(mPhone)}
          onChange={(e) => setMPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
        />
        <input
          type="text"
          placeholder="이메일"
          value={mEmail}
          onChange={(e) => setMEmail(e.target.value)}
        />
        <button type="submit" className='signupbutton'>회원가입</button>
      </form>
      <div className='loginlinkcontainer'>
        <Link to="/">
          <button type="button" className='linkbutton'>로그인</button>
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
