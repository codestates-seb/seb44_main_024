import { useState, useEffect } from 'react';
import axios from 'axios';
import MyBookmarks from './Bookmarks/MyBookmarks';
import MyReviews from './Reviews/MyReviews';
import UserInfo from './UserInfo/UserInfo';
import DeleteUserBtn from './UI/deleteUserBtn';
import { User } from './assets/types/User';
import { getCookie } from '../../utils/cookie';

const MyPage = () => {
  //TODO: hook으로 분리
  const token = getCookie('jwtToken');
  const [isLoading, setIsLoading] = useState(true);
  // const [username, setName] = useState<string>('name');
  const [reviews, setReview] = useState([]);
  const [reviewCounter, setReviewCounter] = useState<number>(0);

  const [user, setUser] = useState<User>({
    username: 'name',
    reviews: reviewCounter,
    memberId: 0,
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          'http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/members/mypage',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          const data = res.data;
          // console.log(data);
          // setName(data.username);
          setUser({
            username: data.username,
            reviews: 0,
            memberId: data.memberId,
          });
          setIsLoading(false);
          // console.log(user);
        } else {
          console.log('failed to fetch UserInfo:', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfo();
  }, []);
  if (isLoading) {
    return <div> Loading...</div>;
  }
  return (
    <div className="flex flex-col justify-center px-20">
      <UserInfo info={user} />
      <MyBookmarks id={user.memberId} />
      <MyReviews
        reviews={reviews}
        setReview={setReview}
        reviewCounter={user.reviews}
        setReviewCount={setReviewCounter}
      />
      <DeleteUserBtn id={user.memberId} />
    </div>
  );
};

export default MyPage;
