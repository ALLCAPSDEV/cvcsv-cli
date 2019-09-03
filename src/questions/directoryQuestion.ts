import inquirer from 'inquirer';
import {blue} from 'kleur';

const directoryQuestion: inquirer.Question = {
  name: 'directory',
  type: 'input',
  message: `${blue("Enter the root directory: ")}`,
  default: './'
}  

export default directoryQuestion;