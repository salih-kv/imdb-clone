import NavbarItem from "./NavBarItem";

export default function Navbar() {
  return (
    <div className="flex items-center lg:text-lg mb-8 mt-12">
      <NavbarItem title="Trending" param="fetchTrending" />
      <NavbarItem title="Top Rated" param="fetchTopRated" />
    </div>
  );
}
