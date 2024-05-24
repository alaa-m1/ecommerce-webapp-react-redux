export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const upperFirstCharacter = (
  str: string,
  convert: "firstWord" | "allWords"
) => {
  const words = str.split(/\s+/);
  let result = "";
  if (convert === "allWords")
    result = words
      .map(
        (word) =>
          word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  if (convert === "firstWord")
    result = words
      .map((word, index) => {
        if (index > 0) return word.toLowerCase()
        else
          return (
            word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLowerCase()
          );
      })
      .join(" ");
  return result;
};
