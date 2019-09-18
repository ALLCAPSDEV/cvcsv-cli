import { InputQuestion } from "inquirer";
import { blue } from "kleur";
import fs from "fs";

const fileLocationQuestion: InputQuestion = {
  name: "csvFileLocation",
  type: "input",
  message: `${blue("Where would you like the csv file to be output?")}`,
  default: "./",
  validate: loc => {
    if (fs.existsSync(loc)) {
      return true;
    }
    return "😱 Sorry! That location doesn't exist, please try again";
  }
};

export default fileLocationQuestion;
