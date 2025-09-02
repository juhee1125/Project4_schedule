import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import '../css/LoginPage.css';

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
      localStorage.setItem("token", text.token.body);
      navigate("/dashboard");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  
  return (
    <div className='flex flex-col justify-center items-center bg-[#ffea82] h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col w-[15%] text-center mb-7'>
        <label className='text-5xl mb-7'>Make a Note</label>
        <input
          type="text"
          placeholder="ID"
          value={mId}
          onChange={(e) => setMId(e.target.value)}
          className={fieldError === "id" ? "border-2 border-[#d84343]" : "border-2 border-[#333]"}
        />
        <input
          type="password"
          placeholder="PW"
          value={mPw}
          onChange={(e) => setMPw(e.target.value)}
          className={fieldError === "pw" ? "border-2 border-[#d84343]" : "border-2 border-[#333]"}
        />
        <div className="min-h-6">
          <label className="text-xl text-[#d84343]">
            {errorMessage ? errorMessage : ""}
          </label>
        </div>
        <button type="submit" className='font-meetme text-2xl text-[#333] border-none rounded bg-white h-10 mt-4 cursor-pointer'>로그인</button>
      </form>
      <div className='flex justify-between w-[15%]'>
        <Link to="/signup">
          <button type="button" className='font-meetme text-xl text-[#b1a467] bg-transparent border-none cursor-pointer'>회원가입</button>
        </Link>
        <Link to="/findID">
          <button type="button" className='font-meetme text-xl text-[#b1a467] bg-transparent border-none cursor-pointer'>아이디찾기</button>
        </Link>
        <Link to="/findPW">
          <button type="button" className='font-meetme text-xl text-[#b1a467] bg-transparent border-none cursor-pointer'>비밀번호찾기</button>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
