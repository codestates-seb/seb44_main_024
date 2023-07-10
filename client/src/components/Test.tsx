import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../redux-toolkit/hooks';
import { RootState } from '../redux-toolkit/store';
import { decrement, increment, selectTest } from '../redux-toolkit/slices/testSlice';

const Test = () => {
  const test = useAppSelector(selectTest);
  const isLoggedIn = useSelector((state: RootState) => state.login.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        빼기
      </button>
      <p>테스트: {test}</p>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        더하기
      </button>
      <div>
        {isLoggedIn ? (
          <div className="bg-blue-300">로그인상태</div>
        ) : (
          <div className="bg-red-300">로그아웃상태</div>
        )}
      </div>
    </div>
  );
};

export default Test;
