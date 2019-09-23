import { InputQuestion } from "inquirer";
import { blue } from "kleur";

const filenameQuestion: InputQuestion = {
  name: "csvFilename",
  type: "input",
  message: `${blue("What would you like the output file to be called?")}`,
  default: "images.csv"
};

export default filenameQuestion;
