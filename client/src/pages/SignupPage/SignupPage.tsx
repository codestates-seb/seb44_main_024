import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SocialLogin from '../../components/SocialLogin.tsx';

const SignupPage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayNameValid, setDisplayNameValid] = useState(false);
  const [displayNameError, setDisplayNameError] = useState('');

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

  const URL = '';

  useEffect(() => {
    if (displayName.length === 0) {
      setDisplayNameValid(false);
      setDisplayNameError('');
    } else if (displayName.length >= 2) {
      setDisplayNameValid(true);
      setDisplayNameError('');
    } else {
      setDisplayNameValid(false);
      setDisplayNameError('이름은 2자 이상이어야 합니다.');
    }
  }, [displayName]);

  useEffect(() => {
    const regex1 =
      /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (userEmail.length === 0) {
      setUserEmailValid(false);
      setUserEmailError('');
    } else if (regex1.test(userEmail)) {
      setUserEmailValid(true);
      setUserEmailError('');
    } else {
      setUserEmailValid(false);
      setUserEmailError('이메일 형식이 올바르지 않습니다.');
    }
  }, [userEmail]);

  useEffect(() => {
    const regex2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (userPassword.length === 0) {
      setUserPasswordValid(false);
      setUserPasswordError('');
    } else if (regex2.test(userPassword)) {
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

  const isValid = userEmailValid && displayNameValid && userPasswordValid && confirmPasswordValid;

  const signupOnClickHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid) {
      try {
        const response = await axios.post(
          `${URL}/signup`, //api 나오는 대로 변경
          JSON.stringify({
            name: displayName,
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
        window.alert('회원가입에 성공하였습니다.');
        navigate('/login');
      } catch (err) {
        console.log(err);
        window.alert('회원가입에 실패하였습니다.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        <div className="text-center text-xl">LOGO</div>
        <div className="mb-6 border-b-2 text-center text-2xl">회원가입</div>

        <div className="mb-4">
          <input
            type="text"
            id="displayName"
            placeholder="닉네임 입력"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-darkGray focus:outline-none"
          />
          {displayNameError && <p className="text-red-500">{displayNameError}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="userEmail"
            placeholder="이메일 입력"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-darkGray focus:outline-none"
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
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-darkGray focus:outline-none"
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
            className="w-full border-2 border-zinc-300 px-1 py-2 focus:border-b-2 focus:border-darkGray focus:outline-none"
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
            isValid ? 'bg-darkGray' : 'cursor-not-allowed bg-gray'
          } w-full px-1 py-2 text-white`}
          type="submit"
          onClick={(e) => signupOnClickHandler(e)}
        >
          회원가입
        </button>

        <button className="mt-2 w-full bg-darkGray px-1 py-2 text-white">
          <Link to="/login">이미 가입하셨나요?</Link>
        </button>
        <SocialLogin />
      </form>
    </div>
  );
};

export default SignupPage;

// 중복 이름, 이메일 확인 로직 추가 해야...
// post 요청 잘 되나 확인
// 이미 가입하셨나요? 버튼에 로그인 페이지 연결
// 잠만 근데 oauth 로그인이랑 회원가입이랑 뭐가 다른거지? 일단 로그인이라 정함
