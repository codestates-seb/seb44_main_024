import { useCallback, useState } from 'react';
import { User } from '../assets/types/User';
import ProfileImg from '../UI/ProfileImg';
// import InfoEditModal from './InfoEditModal';
// import axios from 'axios';

//테스트용 유저 정보
// const user: User = {
//   username: 'Chunsik',
//   password: '1234',
//   image: 'https://media.tenor.com/DtO_BhH5NUAAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif',
//   reviews: 4,
// };

interface userInfoProps {
  info: User;
  setName: any;
}

const UserInfo = ({ info, setName }: userInfoProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openInfoEditModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row px-5 py-24">
        <ProfileImg url={''} />
        <div className="flex flex-col justify-center pl-10">
          <div className="flex flex-row justify-center pb-3">
            <div className="text-4xl font-bold">{info.username}</div>
            <button
              className="flex cursor-pointer items-center justify-center bg-transparent pl-3 opacity-80"
              onClick={openInfoEditModal}
            >
              정보 수정
            </button>
          </div>
          <div className="text-xl">{`작성한 리뷰: ${info.reviews}개`}</div>
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        {isModalOpen && (
          <InfoEditModal
            setModalOpen={setModalOpen}
            username={info.username}
            password={user.password}
            imgUrl={user.image}
          />
        )}
      </div> */}
    </div>
  );
};

export default UserInfo;
