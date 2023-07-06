import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SocialLogin from '../SignupPage/component/SocialLogin.tsx';

const LoginPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showInputError, setShowInputError] = useState(false);

  const navigate = useNavigate();

  const URL = '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userEmail.trim() === '' || userPassword.trim() === '') {
      setShowInputError(true);
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/login`, // API 주소
        JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            withCredentials: true,
          },
        }
      );

      console.log(response.headers);
      window.alert('님, 환영합니다!');
      navigate('/');
    } catch (err) {
      console.log(err);
      window.alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        <div className="text-center text-xl">LOGO</div>
        <div className="mb-6 border-b-2 text-center text-2xl">회원가입</div>

        <div className="mb-4">
          <input
            type="email"
            id="userEmail"
            placeholder="이메일 입력"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-darkGray focus:outline-none"
          />
        </div>

        <div className="mb-2 w-96">
          <input
            type="password"
            id="userPassword"
            placeholder="비밀번호 입력"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-darkGray focus:outline-none"
          />
        </div>

        {showInputError && <p className="text-red-500">이메일과 비밀번호를 입력해주세요.</p>}

        <button
          className="w-full bg-gray px-1 py-2 text-white hover:bg-darkGray"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          로그인
        </button>

        <button className="mt-2 w-full bg-darkGray px-1 py-2 text-white">
          <Link to="/signup"> 아직 계정이 없으신가요? </Link>
        </button>
        <SocialLogin />
      </form>
    </div>
  );
};

export default LoginPage;
