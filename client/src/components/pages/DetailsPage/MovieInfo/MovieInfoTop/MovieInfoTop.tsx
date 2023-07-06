import Person from '../../UI/Person.tsx';
import posterImg from '../../assets/mockup-poster-img.jpg';
import directorImg from '../../assets/director-img.jpg';
import actress1Img from '../../assets/actress-1.jpg';
import actor1Img from '../../assets/actor-1.jpg';
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

const people = [
  {
    name: '미야자키 하야오',
    img: directorImg,
  },
  {
    name: '히이라기 루미',
    img: actress1Img,
  },
  {
    name: '이리노 미유',
    img: actor1Img,
  },
];

const MovieInfoTop = () => {
  return (
    <div className="mb-5 flex">
      <div className="mr-7 shrink-0">
        <img className=" mb-4 h-[400px]" src={posterImg} alt="Poster Img" />
        <a
          href="https://www.youtube.com/watch?v=ByXuk9QqQkk"
          className="flex h-14 w-full items-center justify-center rounded-xl bg-theme1"
        >
          <FaPlay className=" text-2xl text-white" />
        </a>
      </div>

      <div>
        <div className="mb-5 flex items-center">
          <p className="mr-3">평균 별점</p>
          <AiFillStar className="mr-1 text-4xl text-theme1" />
          <p>4.3</p>
        </div>
        <p className="mb-5">
          평범한 열 살 짜리 소녀 치히로 식구는 이사 가던 중 길을 잘못 들어 낡은 터널을 지나가게
          된다. 터널 저편엔 폐허가 된 놀이공원이 있었고 그곳엔 이상한 기운이 흘렀다. 인기척 하나
          없는 이 마을의 낯선 분위기에 불길한 기운을 느낀 치히로는 부모님에게 돌아가자고 조르지만
          부모님은 호기심에 들떠 마을 곳곳을 돌아다니기 시작한다. 어느 음식점에 도착한 치히로의
          부모님은 그 곳에 차려진 음식들을 보고 즐거워하며 허겁지겁 먹어대다가 돼지로 변해버린다.
          겁에 질려 당황하는 치히로에게 낯선 소년 하쿠가 나타나 빨리 이곳을 나가라고 소리치는데...
        </p>
        <p className="mb-1">감독</p>
        <Person name={people[0].name} img={people[0].img} />
        <p className="mb-1 mt-5">출연</p>
        <div className="flex">
          <Person name={people[1].name} img={people[1].img} />
          <Person name={people[2].name} img={people[2].img} />
        </div>
      </div>
    </div>
  );
};

export default MovieInfoTop;
