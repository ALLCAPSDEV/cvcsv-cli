import { blue } from "kleur";
import fs from "fs";
import { PromptObject } from "prompts";

const categoryQuestion: PromptObject = {
  name: "categoryConfirm",
  type: "confirm",
  message: `${blue("Do you want to use a category label?")}`,
  initial: false,
};
export default categoryQuestion;
