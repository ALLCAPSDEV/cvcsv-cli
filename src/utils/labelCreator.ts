import { ConfigFileObj } from "../interfaces/ConfigObj";
export const labelCreator = (words: string[], config: ConfigFileObj) => {
  if (config.category !== false)
    return categoryCreator(words, config.category as number);
  return words.map((word) => `tag=${word}`).toString();
};
/**
 * This provides labels to be included in the CSV file.
 *
 * @param words An array of strings
 * @param category The index of the word to be used as the category
 *
 */

const categoryCreator = (words: string[], category?: number) => {
  return words
    .map((word, idx) => (category === idx ? `category=${word}` : `tag=${word}`))
    .toString();
};
