import still1 from '../../assets/photo-1.jpg';
import still2 from '../../assets/photo-2.jpg';
import still3 from '../../assets/photo-3.jpg';
import still4 from '../../assets/photo-4.jpg';

const MovieInfoBottom = () => {
  return (
    <div>
      <p className="mb-2">갤러리</p>
      <div className="flex justify-between">
        <div className="w-[300px]">
          <img className="h-full w-full" src={still1} alt="still1"></img>
        </div>
        <div className="w-[300px]">
          <img className="h-full w-full" src={still2} alt="still2"></img>
        </div>
        <div className="w-[300px]">
          <img className="h-full w-full" src={still3} alt="still3"></img>
        </div>
        <div className="w-[300px]">
          <img className="h-full w-full" src={still4} alt="still4"></img>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBottom;
