interface PersonProps {
  img: string;
  name: string | undefined;
  role?: string;
}

const Person = ({ img, name, role }: PersonProps) => {
  return (
    <div className="mb-1 mr-3 w-20 rounded-xl border border-solid border-slate-200">
      <img className="rounded-t-xl" src={img} alt={name} />
      <p className="p-0.5 text-center text-xs font-bold text-theme3">{name}</p>
      {role && <p className="p-0.5 text-center text-xs font-bold text-gray-300">{role} 역</p>}
    </div>
  );
};

export default Person;
