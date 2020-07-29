import { blue } from "kleur";
import { PromptObject } from "prompts";

const categoryQuestion: PromptObject[] = [
  {
    name: "category",
    type: "confirm",
    message: `${blue("Do you want to use a category label?")}`,
    initial: false,
  },
  {
    name: "category",
    type: (prev) => (prev ? "number" : null),
    message: `${blue(
      "Enter the directory number: (e.g. the level below the root dir is 0)"
    )}`,
    initial: -1,
  },
];
export default categoryQuestion;
