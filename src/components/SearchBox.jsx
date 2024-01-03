"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSearch } from "react-icons/im";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    router.push(`/search/${search}`);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-b dark:border-gray-500 py-1 flex items-center gap-4 w-full"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="outline-none w-full bg-transparent"
          placeholder="Search..."
        />
        <button
          disabled={!search}
          type="submit"
          className="text-amber-600 disabled:text-gray-400 cursor-pointer focus:bg-black/20 rounded-full p-2"
        >
          <ImSearch />
        </button>
      </form>
    </>
  );
}
