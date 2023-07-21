import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import api from '../../utils/api';
import SocialLogin from '../../components/SocialLogin';

const LoginPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showInputError, setShowInputError] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userEmail.length === 0 || userPassword.length === 0) {
      setShowInputError(true);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: userEmail,
        password: userPassword,
      });

      const { accessToken, refreshToken } = response.data;
      setCookie('accessToken', accessToken, { path: '/' });
      setCookie('refreshToken', refreshToken, { path: '/' });

      window.alert('환영합니다!');
      navigate('/');
    } catch (err) {
      console.log(err);
      window.alert('아이디 또는 비밀번호를 다시 확인해 주세요.');
    }
  };

  // 로그인 상태 확인
  // const isLoggedIn = Boolean(getCookie('accessToken'));

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="mb-3 text-center text-3xl">MovieLog</div>
      <div className="mb-6 border-b-2 border-mainblack text-center text-2xl">로그인</div>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            id="userEmail"
            placeholder="이메일 입력"
            value={userEmail}
            onChange={handleEmailChange}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-mainblack focus:outline-none"
          />
        </div>

        <div className="mb-2 w-96">
          <input
            type="password"
            id="userPassword"
            placeholder="비밀번호 입력"
            value={userPassword}
            onChange={handlePasswordChange}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-mainblack focus:outline-none"
          />
        </div>

        {showInputError && <p className="mb-2 text-red-500">이메일과 비밀번호를 입력해주세요.</p>}

        <button
          className="w-full rounded bg-maindarkgray px-1 py-2 text-white hover:bg-mainblack"
          type="submit"
        >
          로그인
        </button>
      </form>

      <button className="mt-2 w-96 rounded bg-mainblack px-1 py-2 text-white">
        <Link to="/signup"> 아직 계정이 없으신가요? </Link>
      </button>
      <SocialLogin />
    </div>
  );
};

export default LoginPage;
