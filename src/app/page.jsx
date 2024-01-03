// Fix: "search params object is empty in production with next 13 app dir"
// info: "https://github.com/vercel/next.js/issues/43077"

export const dynamic = "force-dynamic"; // this is the fix

import Navbar from "@/components/NavBar";
import Results from "@/components/Results";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";

  const res = await fetch(
    `https://api.themoviedb.org/3/${
      genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
    }?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <main className="max-w-screen-2xl mx-auto pb-16 pt-32 px-4">
      <section>
        <div className="w-full h-80 mb-8 rounded-xl overflow-hidden relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${results[0]?.backdrop_path}`}
            width={1600}
            height={600}
            className="sm:rounded-xl group-hover:opacity-80 transition-opacity duration-200 h-full object-cover w-full object-center"
            placeholder="blur"
            blurDataURL="/spinner.svg"
            alt="image is not available"
          ></Image>
          <div className="absolute left-8 bottom-8 text-white max-w-lg">
            <h2 className="truncate text-lg font-bold mb-2">
              {results[0]?.name || results[0]?.title}
            </h2>
            <p className="line-clamp-2 text-md">{results[0]?.overview}</p>
            <button className="bg-[#ff024d] py-2 px-4 mt-4 rounded-3xl flex items-center gap-2">
              <IoPlay />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </section>
      <Navbar />
      <section>
        <Results results={results} />
      </section>
    </main>
  );
}
