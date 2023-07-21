import MyBookmarks from './Bookmarks/MyBookmarks';
import MyReviews from './Reviews/MyReviews';
import UserInfo from './UserInfo/UserInfo';

const MyPage = () => {
  return (
    <div className="flex flex-col justify-center px-20">
      <UserInfo />
      <MyBookmarks />
      <MyReviews />
    </div>
  );
};

export default MyPage;
