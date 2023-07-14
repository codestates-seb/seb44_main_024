interface PersonProps {
  img: string;
  name: string | undefined;
}

const Person = ({ img, name }: PersonProps) => {
  return (
    <div className="mr-3 w-20 rounded-xl border border-solid border-slate-200">
      <img className="rounded-t-xl" src={img} alt={name} />
      <p className="p-0.5 text-center text-xs font-bold text-theme3">{name}</p>
    </div>
  );
};

export default Person;
