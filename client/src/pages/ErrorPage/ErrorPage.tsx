import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <img src="../../../public/img/errorImg.png" alt="에러 이미지" className="h-96 w-96" />
      <p className="text-2xl font-bold text-mainblack">OOPS!</p>
      <p className="mt-2 text-mainblack">요청하신 페이지를 찾을 수 없습니다.</p>
      <button className="mt-2 w-96 border-2 bg-mainblack px-1 py-2 text-white hover:border-solid hover:border-mainblack hover:bg-white hover:text-mainblack">
        <Link to="/"> 홈으로 돌아가기 </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
