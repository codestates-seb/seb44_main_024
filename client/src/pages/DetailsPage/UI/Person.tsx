import { Link } from 'react-router-dom';

interface PersonProps {
  // img: string;
  name: string | undefined;
  role?: string;
}
// 디폴트 프로필사진
const defaultProfile =
  'https://thebulletin.org/wp-content/themes/atomic-bulletin/resources/assets/images/person-dummy.jpg';

const Person = ({ name, role }: PersonProps) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="mb-1 mr-3 w-20 rounded-xl border border-solid border-slate-200">
      <Link onClick={handleClick} className="cursor-pointer" to={`/search?keyword=${name}`}>
        <img className="rounded-t-xl" src={defaultProfile} alt={name} />
        <p className="p-0.5 text-center text-xs font-bold text-theme3">{name}</p>
        {role && <p className="p-0.5 text-center text-xs font-bold text-gray-300">{role} 역</p>}
      </Link>
    </div>
  );
};

export default Person;
