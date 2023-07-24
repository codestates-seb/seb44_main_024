import { useState, useEffect } from 'react';
import axios from 'axios';
import MyBookmarks from './Bookmarks/MyBookmarks';
import MyReviews from './Reviews/MyReviews';
import UserInfo from './UserInfo/UserInfo';
import DeleteUserBtn from './UI/deleteUserBtn';
import { User } from './assets/types/User';

const MyPage = () => {
  //TODO: hook으로 분리
  const [username, setName] = useState<string>('name');
  const [reviewCounter, setReviewCounter] = useState<number>(0);

  const [user, setUser] = useState<User>({
    username: username,
    reviews: reviewCounter,
    memberId: 0,
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          'http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/members/mypage'
        );

        if (res.status === 200) {
          const data = res.data;
          setName(data.username);
          setUser({
            username: username,
            reviews: 0,
            memberId: data.memberId,
          });
        } else {
          console.log('failed to fetch UserInfo:', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="flex flex-col justify-center px-20">
      <UserInfo info={user} />
      <MyBookmarks id={user.memberId} />
      <MyReviews reviewCounter={user.reviews} setReviewCount={setReviewCounter} />
      <DeleteUserBtn id={user.memberId} />
    </div>
  );
};

export default MyPage;
