import MyBookmarks from './Bookmarks/MyBookmarks';
import MyReviews from './Reviews/MyReviews';
import UserInfo from './UserInfo/UserInfo';

const MyPage = () => {
  return (
    <div>
      <UserInfo />
      <MyReviews />
      <MyBookmarks />
    </div>
  );
};

export default MyPage;
