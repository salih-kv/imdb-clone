import Image from "next/image";
import Link from "next/link";
import { FiThumbsUp } from "react-icons/fi";

export default function Card({ result }) {
  return (
    <div className="cursor-pointer sm:p-3  sm:shadow-md rounded-lg transition-shadow duration-200 group">
      <Link href={`/movie/${result.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            result.backdrop_path || result.poster_path
          }`}
          width={500}
          height={300}
          className="sm:rounded-xl group-hover:opacity-80 transition-opacity duration-200 h-auto max-w-full"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="image is not available"
        ></Image>
        <div className="p-2">
          <p className="line-clamp-2 text-md">{result.overview}</p>
          <h2 className="truncate text-lg font-bold mt-2">
            {result.title || result.name}
          </h2>
          <p className="flex items-center justify-between mt-2 text-sm">
            {result.release_date || result.first_air_date}
            <span className="flex items-center">
              <FiThumbsUp className="h-5 mr-1 ml-3" /> {result.vote_count}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
