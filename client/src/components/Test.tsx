import { useAppSelector, useAppDispatch } from '../redux-toolkit/hooks';

import { decrement, increment, selectTest } from '../redux-toolkit/slices/testSlice';

const Test = () => {
  const test = useAppSelector(selectTest);
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
    </div>
  );
};

export default Test;
