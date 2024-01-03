// Fix the problem for "search params object is empty in production with next 13 app dir"
// for more info "https://github.com/vercel/next.js/issues/43077"

export const dynamic = "force-dynamic"; // this is the fix

import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import Results from "@/components/Results";

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
        <div className="w-full h-80 mb-8 rounded-lg overflow-hidden relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${results[16]?.backdrop_path}`}
            width={1600}
            height={300}
            style={{ width: "100%", height: "auto" }}
            className="sm:rounded-xl group-hover:opacity-80 transition-opacity duration-200 h-auto max-w-full object-center"
            placeholder="blur"
            blurDataURL="/spinner.svg"
            alt="image is not available"
          ></Image>
          <div className="absolute left-8 bottom-8 text-white max-w-lg">
            <h2 className="truncate text-lg font-bold mb-2">
              {results[16]?.name || results[16]?.title}
            </h2>
            <p className="line-clamp-2 text-md">{results[16]?.overview}</p>
            <button className="bg-[#ff024d] py-2 px-4 mt-4 rounded-3xl flex items-center gap-2">
              <IoPlay />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <Results results={results} />
      </section>
    </main>
  );
}
