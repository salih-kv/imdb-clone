import Image from "next/image";
import Link from "next/link";

export default function Card({ result }) {
  const imageUrl =
    result.poster_path || result.backdrop_path
      ? `https://image.tmdb.org/t/p/original/${
          result.poster_path || result.backdrop_path
        }`
      : "https://placehold.jp/32/f2f2f2/c2c2c2/500x900.png?text=Image%20Not%20Found";

  const year = new Date(
    result.release_date || result.first_air_date
  ).getFullYear();

  return (
    <Link
      href={`/movie/${result.id}`}
      className="relative cursor-pointer transition-shadow duration-200 group rounded-xl"
    >
      <div className="w-full h-64 md:h-96">
        <Image
          src={imageUrl}
          width={300}
          height={500}
          className="group-hover:opacity-80 transition-opacity duration-200 h-full object-cover w-full rounded-xl"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="image is not available"
        ></Image>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-full bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
      <div className="absolute left-0 right-0 bottom-0 p-4 text-white invisible group-hover:visible">
        <h2 className="truncate text-lg font-bold mt-2">
          {result.title || result.name}
        </h2>
        <p className="flex items-center justify-between mt-2 text-sm">
          {year ? year : ""}
        </p>
      </div>
    </Link>
  );
}
