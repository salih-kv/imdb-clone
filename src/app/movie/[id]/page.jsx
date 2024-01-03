import Results from "@/components/Results";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";
import { FiThumbsUp } from "react-icons/fi";

const API_KEY = process.env.API_KEY;

async function getMovie(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  return await res.json();
}

async function getMovieTrailer(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();

  const trailerVideo = data?.results?.find(
    (video) => video.type === "Trailer" && video.official
  );

  if (trailerVideo) {
    return trailerVideo;
  } else {
    return null;
  }
}

async function getRelatedMovies(genres) {
  try {
    const genreIds = genres.map((genre) => genre.id).join(",");

    const moviesResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&sort_by=popularity.desc&include_adult=false&page=1`
    );
    const moviesData = await moviesResponse.json();
    const relatedMovies = moviesData.results.slice(0, 10);

    return relatedMovies;
  } catch (error) {
    console.error("Error fetching related movies:", error.message);
    return [];
  }
}

export default async function MoviePage({ params }) {
  const movieId = params.id;
  const movie = await getMovie(movieId);
  const movieTrailer = await getMovieTrailer(movieId);
  const trailerKey = movieTrailer?.key;
  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
  const relatedMovies = await getRelatedMovies(movie.genres);

  const year = new Date(
    movie.release_date || movie.first_air_date
  ).getFullYear();

  return (
    <div className="w-full max-w-screen-2xl mx-auto pb-16">
      <div className="w-full h-[400px] pt-20 relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          width={2600}
          height={800}
          className="max-w-full h-full object-cover object-top"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
        ></Image>
        <div className="absolute left-0 right-0 bottom-0 h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute left-16 right-0 top-2/4 sm:flex gap-8 hidden">
          <a
            href={trailerUrl}
            target="_blank"
            className="drop-shadow-2xl shadow-2xl rounded relative group"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              width={200}
              height={300}
              className="max-w-full h-full rounded-md "
              placeholder="blur"
              blurDataURL="/spinner.svg"
              alt="Movie poster"
            ></Image>
            <div className="absolute left-0 right-0 bottom-0 h-full invisible group-hover:visible rounded-md bg-black/20 flex items-center justify-center">
              <span className="border-2 border-white rounded-full p-2">
                <IoPlay className="text-3xl text-white" />
              </span>
            </div>
          </a>
          <div className="text-white">
            <div className="mb-4">
              <span className="font-bold text-2xl flex items-center gap-4">
                <FaStar className="text-amber-400" />
                {Number(movie.vote_average).toFixed(1)}
              </span>
            </div>
            <p className="mb-3">{year}</p>
            <h2 className="text-3xl mb-3 font-bold">
              {movie.title || movie.name}
            </h2>
            <p>{movie.tagline}</p>
          </div>
        </div>
      </div>
      <div className="md:pt-8 gap-12 mt-24 px-4">
        <div className="mb-8">
          <span className="font-bold text-2xl flex items-center gap-4">
            <FaStar className="text-amber-400" />
            {Number(movie.vote_average).toFixed(1)}
          </span>
        </div>
        <div className="space-x-4 mb-4">
          {movie.genres?.map(({ id, name }) => (
            <span
              key={id}
              className="bg-gray-200 dark:text-black py-1 px-2 rounded-3xl text-sm"
            >
              {name}
            </span>
          ))}
        </div>
        <h2 className="text-3xl mb-3 font-bold">{movie.title || movie.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24">
          <div>
            <p className="text-lg mb-3">
              <span className="font-semibold mr-1">Overview:</span>
              {movie.overview}
            </p>
          </div>
          <div>
            <p className="mb-3">
              <span className="font-semibold mr-1">Date Released:</span>
              {movie.release_date || movie.first_air_date}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Rating:</span>
              {movie.vote_count}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Runtime:</span>
              {movie.runtime} Min
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Language:</span>
              {movie.original_language}
            </p>
          </div>
        </div>
      </div>
      {/* Related Movies */}
      <section className="mt-16 font-bold text-xl px-4">
        <h1 className="mb-6 text-gray-400">Related Movies</h1>
        <Results results={relatedMovies} />
      </section>
    </div>
  );
}
