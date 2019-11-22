import { blue } from 'kleur';
import fs from 'fs';
import { PromptObject } from 'prompts';

const fileLocationQuestion: PromptObject = {
  name: 'csvFileLocation',
  type: 'text',
  message: `${blue('Where would you like the csv file to be output?')}`,
  initial: './',
  validate: loc => {
    if (fs.existsSync(loc)) {
      return true;
    }
    return "😱 Sorry! That location doesn't exist, please try again";
  },
};

export default fileLocationQuestion;
