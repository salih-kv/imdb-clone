import Image from "next/image";
import Card from "./components/Card";
import { IoPlay } from "react-icons/io5";

const API_KEY = process.env.API_KEY;

export default async function Home() {
  const genre = "fetchTrending";

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
    <main className="max-w-screen-xl mx-auto pb-16">
      <section>
        <div className="w-full h-80 bg-green-100 mb-8 rounded-lg overflow-hidden relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/gDtZQmfzvErZpeXOVeCBQE9WkSF.jpg`}
            width={800}
            height={300}
            style={{ width: "100%", height: "auto" }}
            className="sm:rounded-xl group-hover:opacity-80 transition-opacity duration-200 h-auto max-w-full"
            placeholder="blur"
            blurDataURL="/spinner.svg"
            alt="image is not available"
          ></Image>
          <div className="absolute left-8 bottom-8 text-white max-w-md">
            <h2 className="truncate text-lg font-bold mb-2">Doctor Who</h2>
            <p className="line-clamp-2 text-md">
              The Doctor and friends travel from the dawn of human history to
              distant alien worlds. And everywhere they go, they find adventure,
              terror, fun, chases, joy and monsters.
            </p>
            <button className="bg-[#ff024d] py-2 px-4 mt-4 rounded-3xl flex items-center gap-2">
              <IoPlay />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-5 gap-4">
          {results.map((result) => (
            <Card key={result.id} result={result} />
          ))}
        </div>
      </section>
    </main>
  );
}
