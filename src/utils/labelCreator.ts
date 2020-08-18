import { ConfigFileObj, ConfigFileLabels } from "../interfaces/ConfigObj";
export const labelCreator = (words: string[], config: ConfigFileObj) => {
  if (config.category !== false)
    return categoryCreator(words, config.category as number);
  if (config.labels === undefined) {
    return words.map((word) => `tag=${word}`).toString();
  } else {
    const defaults: number[] = [];
    const LabelsKeys = Object.keys(config.labels);
    const newLabels = LabelsKeys.reduce<string[]>((prev, key) => {
      const labels = config.labels as ConfigFileLabels;
      const value = labels[key];
      if (typeof value === "number") {
        if (LabelsKeys.includes("defaults")) defaults.push(value);
        prev.push(`${key}=${words[value]}`);
      }
      if (typeof value === "string") prev.push(`${key}=${value}`);
      return prev;
    }, []);
    if (defaults.length > 0) {
      const tag = tags(defaults, words);
      return newLabels.concat(tag).toString();
    }
    return newLabels.toString();
  }
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

const tags = (defaults: number[], words: string[]) => {
  const sortedDefaults = defaults.sort((a, b) => a - b);

  while (sortedDefaults.length) {
    words.splice(sortedDefaults.pop() as number, 1);
  }

  return words.map((word) => `tag=${word}`);
};
