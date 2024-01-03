import Card from "./Card";

export default function Results({ results }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  );
}
