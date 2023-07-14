import { User } from '../assets/types/User';

//테스트용 가짜 유저 정보 -> 추후 삭제
const dummyUser: User = {
  username: 'Chunsik',
  password: '1234',
  image: 'https://media.tenor.com/DtO_BhH5NUAAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif',
  reviews: 4,
  genre: '액션',
};

//TODO: API로 정보 불러오기 -> GET , `/members/{member-id}` -> username:string, profile_Img: string

const UserInfo = () => {
  return (
    <div className="flex flex-row">
      <img src="/" alt="profile img" />
      <div>
        <div>
          <div>name</div>
          <div>정보 수정</div>
        </div>
        <div>{`작성한 리뷰: ${dummyUser.reviews}개`}</div>
        <div>{`선호 장르: ${dummyUser.genre}`}</div>
      </div>
    </div>
  );
};

export default UserInfo;
