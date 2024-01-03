import Link from "next/link";

const MenuItem = ({ title, path, Icon }) => {
  return (
    <div>
      <Link href={path} className="hover:text-amber-600 flex items-center">
        <Icon className="text-2xl sm:hidden mx-1" />
        <p className="hidden sm:inline my-2 text-sm font-medium">{title}</p>
      </Link>
    </div>
  );
};

export default MenuItem;
