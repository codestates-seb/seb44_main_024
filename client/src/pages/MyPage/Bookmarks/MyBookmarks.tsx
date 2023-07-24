import ShortMovieList from '../UI/ShortMovieList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../../utils/cookie';

interface MyBookmarkProps {
  id: number;
}

const MyBookmarks = ({ id }: MyBookmarkProps) => {
  const token = getCookie('jwtToken');
  const [bookmarks, setBookmark] = useState([]);
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(
          `http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/members/${id}/bookmarks`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const data = res.data;
          setBookmark(data);
        } else {
          console.log('Failed to fetch bookmark data:', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookmarks();
  }, [id, token]);

  // api 연결 후 수정
  const bookmarkList = [...bookmarks];
  const moviesToRender = bookmarkList.slice(0, 5);
  const bookmarksCounter = bookmarkList.length;

  return (
    <div>
      <div className="text-2xl font-semibold"> 나의 북마크 </div>
      <div className="flex items-center justify-center">
        {bookmarksCounter > 0 ? (
          <ShortMovieList movies={moviesToRender} />
        ) : (
          <div className="pb-28 pt-24 text-xl opacity-80">마음에 드는 영화를 북마크해 보세요. </div>
        )}
      </div>
    </div>
  );
};

export default MyBookmarks;
