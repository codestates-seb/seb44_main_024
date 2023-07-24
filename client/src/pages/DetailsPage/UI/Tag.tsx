import { Link } from 'react-router-dom';

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <button className="mr-2 w-20 bg-theme2 text-white hover:bg-theme3">
      <Link to={`/category/tag?tag=${tag}`}>#{tag}</Link>
    </button>
  );
};

export default Tag;
