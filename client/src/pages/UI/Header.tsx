import { BsSearch } from 'react-icons/bs';

// interface HeaderProps {
//   search: string;
// }
// const Header: React.FC<HeaderProps> = ({ search }) => {

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-[#FBE353] px-10 py-6 text-mainblack ">
      <div className="flex flex-row">
        <div className="mr-16 cursor-pointer text-4xl font-bold hover:bg-maingray">Logo</div>
        <div className="mt-2 cursor-pointer text-2xl font-bold  hover:bg-maingray ">Categories</div>
      </div>

      <div className="flex items-center">
        <div className="mr-6 flex items-center">
          <input
            type="text"
            placeholder="검색"
            className="w-32 border-b-2 border-maindarkgray bg-mainyellow px-4 py-2" //focus:outline-none
          />
          <button className="mt-2 border-b-2 border-maindarkgray px-4 py-2 text-mainblack hover:bg-maingray">
            <BsSearch />
          </button>
        </div>
        <div className="mr-4 mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          Login
        </div>
        <div className="mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default Header;
