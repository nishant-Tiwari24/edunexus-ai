export const renderTitle = (title: string) => {
  const words = title.split(" ");
  console.log(words);
  const middleIndex = Math.floor(words.length / 2);
  const middleWordsStart = Math.max(0, middleIndex - 1);
  const middleWordsEnd = Math.min(words.length, middleIndex + 2);

  return (
    <p className="text-3xl font-bold text-center mb-4">
      {words.slice(0, middleWordsStart).join(" ")}{" "}
      <span className="text-purple-400">
        {words.slice(middleWordsStart, middleWordsEnd).join(" ")}
      </span>{" "}
      {words.slice(middleWordsEnd).join(" ")}
    </p>
  );
};
