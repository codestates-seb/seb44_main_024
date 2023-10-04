import { removeCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('jwtToken');
    window.alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <button className="mt-2 w-36 rounded bg-mainblack px-1 py-2 text-white" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
