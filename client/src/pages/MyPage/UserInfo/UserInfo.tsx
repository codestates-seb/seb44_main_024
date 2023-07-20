import { User } from '../assets/types/User';
import ProfileImg from '../UI/ProfileImg';

//테스트용 가짜 유저 정보 -> 추후 삭제
const dummyUser: User = {
  username: 'Chunsik',
  password: '1234',
  image: 'https://media.tenor.com/DtO_BhH5NUAAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif',
  reviews: 4,
};

//TODO: API로 정보 불러오기 -> GET , `/members/{member-id}` -> username:string, profile_Img: string
//TODO: 회원정보 수정 modal 연결

const UserInfo = () => {
  return (
    <div className="flex flex-row px-5 py-24">
      <ProfileImg url={dummyUser.image} />
      <div className="flex flex-col justify-center pl-10">
        <div className="flex flex-row justify-center pb-3">
          <div className="text-4xl font-bold">{dummyUser.username}</div>
          <div className="flex cursor-pointer items-center justify-center pl-3 opacity-80">
            정보 수정
          </div>
        </div>
        <div className="text-xl">{`작성한 리뷰: ${dummyUser.reviews}개`}</div>
      </div>
    </div>
  );
};

export default UserInfo;
