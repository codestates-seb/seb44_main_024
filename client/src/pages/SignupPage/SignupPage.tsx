import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin';
import api from '../../utils/api';

const SignupPage: React.FC = () => {
  const [userName, setuserName] = useState('');
  const [userNameValid, setuserNameValid] = useState(false);
  const [userNameError, setuserNameError] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [userEmailValid, setUserEmailValid] = useState(false);
  const [userEmailError, setUserEmailError] = useState('');

  const [userPassword, setUserPassword] = useState('');
  const [userPasswordValid, setUserPasswordValid] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (userName.length === 0) {
      setuserNameValid(false);
      setuserNameError('');
    } else if (userName.length >= 2) {
      setuserNameValid(true);
      setuserNameError('');
    } else {
      setuserNameValid(false);
      setuserNameError('이름은 2자 이상이어야 합니다.');
    }
  }, [userName]);

  useEffect(() => {
    const emailValidationRegex =
      /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (userEmail.length === 0) {
      setUserEmailValid(false);
      setUserEmailError('');
    } else if (emailValidationRegex.test(userEmail)) {
      setUserEmailValid(true);
      setUserEmailError('');
    } else {
      setUserEmailValid(false);
      setUserEmailError('이메일 형식이 올바르지 않습니다.');
    }
  }, [userEmail]);

  useEffect(() => {
    const pwValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (userPassword.length === 0) {
      setUserPasswordValid(false);
      setUserPasswordError('');
    } else if (pwValidationRegex.test(userPassword)) {
      setUserPasswordValid(true);
      setUserPasswordError('');
    } else {
      setUserPasswordValid(false);
      setUserPasswordError('비밀번호 형식이 올바르지 않습니다.');
    }
  }, [userPassword]);

  useEffect(() => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordValid(false);
      setConfirmPasswordError('');
    } else if (confirmPassword === userPassword) {
      setConfirmPasswordValid(true);
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordValid(false);
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
  }, [confirmPassword, userPassword]);

  const isValid = userEmailValid && userNameValid && userPasswordValid && confirmPasswordValid;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid) {
      try {
        const response = await api.post('/register', {
          name: userName,
          email: userEmail,
          password: userPassword,
        });

        console.log(response.headers);
        window.alert('회원가입에 성공하였습니다.');
        navigate('/login');
      } catch (err) {
        console.log(err);
        window.alert('회원가입에 실패하였습니다.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-center text-xl">LOGO</div>
      <div className="mb-6 border-b-2 border-mainblack text-center text-2xl">회원가입</div>

      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <input
            type="text"
            id="userName"
            placeholder="닉네임 입력"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-mainblack focus:outline-none"
          />
          {userNameError && <p className="text-red-500">{userNameError}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="userEmail"
            placeholder="이메일 입력"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-mainblack focus:outline-none"
          />
          {userEmailError && <p className="text-red-500">{userEmailError}</p>}
        </div>

        <div className="mb-2 w-96">
          <input
            type="password"
            id="userPassword"
            placeholder="비밀번호 입력"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-mainblack focus:outline-none"
          />
          <div className="mt-2 flex gap-3">
            <p className={`${userPassword.length >= 8 ? 'text-darkBlue' : 'text-zinc-400'}`}>
              8자 이상 ✓
            </p>
            <p className={`${/[A-Za-z]/.test(userPassword) ? 'text-darkBlue' : 'text-zinc-400'}`}>
              알파벳 ✓
            </p>
            <p className={`${/\d/.test(userPassword) ? 'text-darkBlue' : 'text-zinc-400'}`}>
              숫자 ✓
            </p>
            <p
              className={`${/[^A-Za-z0-9]/.test(userPassword) ? 'text-darkBlue' : 'text-zinc-400'}`}
            >
              특수기호 ✓
            </p>
          </div>
          {userPasswordError && <p className="text-red-500">{userPasswordError}</p>}
        </div>

        <div className="mb-4 w-96">
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-mainblack focus:outline-none"
          />
          <div className="mt-2">
            <p
              className={`${
                confirmPassword === userPassword && confirmPassword.length > 1
                  ? 'text-darkBlue'
                  : 'text-zinc-400'
              }`}
            >
              비밀번호 일치 ✓
            </p>
          </div>
          {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
        </div>

        <button
          className={`${
            isValid ? 'bg-mainblack' : 'cursor-not-allowed bg-maindarkgray'
          } w-full px-1 py-2 text-white`}
          type="submit"
        >
          회원가입
        </button>
      </form>

      <button className="mt-2 w-96 bg-mainblack px-1 py-2 text-white">
        <Link to="/login">이미 가입하셨나요?</Link>
      </button>
      <SocialLogin />
    </div>
  );
};

export default SignupPage;