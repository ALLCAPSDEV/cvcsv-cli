/**
 * This provides labels to be included in the CSV file.
 *
 * @param words An array of strings
 * @param category The index of the word to be used as the category
 *
 */

export const labelCreator = (words: string[], category?: number) => {
  return words
    .map((word, idx) => (category === idx ? `category=${word}` : `tag=${word}`))
    .toString();
};
