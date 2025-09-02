import { useState } from 'react';
import { Link } from 'react-router-dom';

// import '../css/FindIdPage.css';

const FindId = () => {
    const [mName, setMName] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [findId, setFindId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8080/api/user/findID", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mName, mPhone })
            });

            const result = await response.text();
            console.log(mName, mPhone)

            if (result === "일치하는 아이디가 없습니다") {
                if (mName === ""){
                    setFindId("이름을 입력해주세요");
                } else if (mPhone === ""){
                    setFindId("휴대폰번호를 입력해주세요");
                }
                else{
                    setFindId("일치하는 아이디가 없습니다");
                }
            }else{
                setFindId(`${mName}님의 아이디는 ${result}입니다`);
            }
        } catch (error) {
        console.error("로그인 오류:", error);
        }
  };

  return (
    <div className='flex flex-col justify-center items-center bg-[#ffea82] h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col text-center mb-7 w-[15%]'>
        <label className='text-5xl mb-7'>아이디찾기</label>
        <input
            className='border-2 border-[#333]'
            type="text"
            placeholder="Name"
            value={mName}
            onChange={(e) => setMName(e.target.value)}
        />
        <input
            className='border-2 border-[#333]'
            type="text"
            placeholder="Phone"
            value={mPhone}
            onChange={(e) => setMPhone(e.target.value)}
        />
        <label className='min-h-6 text-xl'>{findId === "" ? "" : findId}</label>
        <button type="submit" className='font-meetme text-2xl text-[#333] border-none rounded bg-white h-10 mt-4 cursor-pointer'>확인</button>
        </form>
        <div className='flex justify-between w-[15%]'>
            <Link to="/findPw">
                <button type="button" className='font-meetme text-xl text-[#b1a467] bg-transparent border-none cursor-pointer'>비밀번호찾기</button>
            </Link>
            <Link to="/signup">
                <button type="button" className='font-meetme text-xl text-[#b1a467] bg-transparent border-none cursor-pointer'>회원가입</button>
            </Link>
            <Link to="/">
                <button type="button" className='font-meetme text-xl text-[#b1a467] bg-transparent border-none cursor-pointer'>로그인</button>
            </Link>
        </div>
    </div>
  )
}

export default FindId
