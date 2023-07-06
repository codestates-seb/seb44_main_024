import mainImg from '../assets/mockup-main-img.jpg';

const MovieTitle = () => {
  return (
    <div className="relative h-[500px] w-full">
      <img className="h-full w-full object-cover" src={mainImg} alt="Main Img" />
      <div className="absolute left-0 top-2/3 z-10 h-full w-full">
        <div className="z-20 mx-auto my-0 max-w-[1320px] px-10">
          <p className="text-4xl font-bold text-white">센과 치히로의 행방불명</p>
          <p className="mb-4 font-semibold text-white">Spirited Away</p>
          <p className="font-medium text-white">2001 · 애니메이션/판타지/가족 · 일본</p>
          <p className="font-medium text-white">2시간 6분 · 전체</p>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
