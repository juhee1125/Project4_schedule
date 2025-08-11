import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/FindIdPage.css';

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

            if (result === "일치하는 아이디가 없습니다") {
                if (mName ===""){
                    setFindId("이름을 입력해주세요");
                } else{
                    setFindId("휴대폰번호를 입력해주세요");
                }
            }else{
                setFindId(`${mName}님의 아이디는 ${result}입니다`);
            }
        } catch (error) {
        console.error("로그인 오류:", error);
        }
  };

  return (
    <div className='findIDP'>
        <form onSubmit={handleSubmit} className='findIDform'>
        <label className='loginlabel'>아이디찾기</label>
        <input
            type="text"
            placeholder="Name"
            value={mName}
            onChange={(e) => setMName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Phone"
            value={mPhone}
            onChange={(e) => setMPhone(e.target.value)}
        />
        <label className='findIdlabel'>{findId === "" ? "" : findId}</label>
        <button type="submit" className='loginbutton'>확인</button>
        </form>
        <div className='linkcontainer'>
            <Link to="/findPw">
                <button type="button" className='linkbutton'>비밀번호찾기</button>
            </Link>
            <Link to="/signup">
                <button type="button" className='linkbutton'>회원가입</button>
            </Link>
            <Link to="/">
                <button type="button" className='linkbutton'>로그인</button>
            </Link>
        </div>
    </div>
  )
}

export default FindId
