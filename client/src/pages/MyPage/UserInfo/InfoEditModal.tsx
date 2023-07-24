import React, { useState } from 'react';
import axios from 'axios';

interface InfoProps {
  setModalOpen: any;
  username: string;
  password: string;
  imgUrl: string;
}

const InfoEditModal = ({ setModalOpen, username, password, imgUrl }: InfoProps) => {
  const [name, setName] = useState(username);
  const [pw, setPw] = useState(password);
  const [img, setImgUrl] = useState(imgUrl);

  const cancelChange = () => {
    setName(username);
    setPw(password);
    setImgUrl(imgUrl);
    setModalOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const submitChange = () => {
    // post 요청 보내기
    axios({
      method: 'post',
      url: '/',
      data: {
        username: name,
        password: pw,
        image: img,
      },
    })
      .then((res) => {
        console.log(res);
        console.log('수정 완료');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-7/12 flex-col border border-black">
      <div className="h-10 bg-black px-6 text-xl leading-10 text-white"> 정보 수정 </div>
      <div className="flex flex-col items-center justify-center bg-white py-6 text-xl">
        <div className="flex flex-row">
          <div> 새로운 닉네임: </div>
          <div className="pl-6">
            <input placeholder="변경할 닉네임을 입력하세요." onChange={handleNameChange} />
          </div>
        </div>
        <div className="flex flex-row pt-1">
          <div> 새로운 비밀번호: </div>
          <div className="pl-4">
            <input placeholder="변경할 비밀번호를 입력하세요." onChange={handlePwChange} />
          </div>
        </div>
        <div className="mt-6 flex flex-row">
          <button
            className="mx-3 rounded-lg border-black bg-white px-6 py-3 text-base"
            onClick={cancelChange}
          >
            수정 취소
          </button>
          <button
            className="mx-3 rounded-lg bg-black px-6 py-3 text-base text-white"
            onClick={submitChange}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoEditModal;
