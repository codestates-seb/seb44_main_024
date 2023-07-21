import { useCallback, useState } from 'react';
import { User } from '../assets/types/User';
import ProfileImg from '../UI/ProfileImg';
import InfoEditModal from './InfoEditModal';
// import { getUserinfo } from '../assets/api/UserInfoApi';

//TODO: API로 정보 불러오기 getUserinfo(id) <- member id 알아오기
//테스트용 유저 정보 -> 추후 삭제
const user: User = {
  username: 'Chunsik',
  password: '1234',
  image: 'https://media.tenor.com/DtO_BhH5NUAAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif',
  reviews: 4,
};

const UserInfo = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openInfoEditModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row px-5 py-24">
        <ProfileImg url={user.image} />
        <div className="flex flex-col justify-center pl-10">
          <div className="flex flex-row justify-center pb-3">
            <div className="text-4xl font-bold">{user.username}</div>
            <button
              className="flex cursor-pointer items-center justify-center bg-transparent pl-3 opacity-80"
              onClick={openInfoEditModal}
            >
              정보 수정
            </button>
          </div>
          <div className="text-xl">{`작성한 리뷰: ${user.reviews}개`}</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {isModalOpen && (
          <InfoEditModal
            setModalOpen={setModalOpen}
            username={user.username}
            password={user.password}
            imgUrl={user.image}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
