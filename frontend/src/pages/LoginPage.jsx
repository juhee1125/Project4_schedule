import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../css/LoginPage.css';

const LoginPage = () => {
  const [mId, setMId] = useState('');
  const [mPw, setMPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mId, mPw })
      });

      const text = await response.json(); 

      if (!response.ok) {
        setErrorMessage(text.error)
        console.log(text.error.includes("아이디"))
        if (text.error.includes("아이디")) {
          setFieldError("id");
        } else if (text.error.includes("비밀번호")) {
          setFieldError("pw");
        } else {
          setFieldError("");
        }

        return;
      }

      setErrorMessage("");

      //토큰 저장
      localStorage.setItem("token", text);
      navigate("/dashboard");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  
  return (
    <div className='loginP'>
      <form onSubmit={handleSubmit} className='loginform'>
        <label className='loginlabel'>Make a Note</label>
        <input
          type="text"
          placeholder="ID"
          value={mId}
          onChange={(e) => setMId(e.target.value)}
          className={fieldError === "id" ? "input-error" : "input-nonerror"}
        />
        <input
          type="password"
          placeholder="PW"
          value={mPw}
          onChange={(e) => setMPw(e.target.value)}
          className={fieldError === "pw" ? "input-error" : "input-nonerror"}
        />
        <div className="errorcontainer">
          <label className="errorlabel">
            {errorMessage ? errorMessage : ""}
          </label>
        </div>
        <button type="submit" className='loginbutton'>로그인</button>
      </form>
      <div className='linkcontainer'>
        <Link to="/signup">
          <button type="button" className='linkbutton'>회원가입</button>
        </Link>
        <Link to="/findID">
          <button type="button" className='linkbutton'>아이디찾기</button>
        </Link>
        <Link to="/findPW">
          <button type="button" className='linkbutton'>비밀번호찾기</button>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
