import { blue } from 'kleur';
import fs from 'fs';
import { PromptObject } from 'prompts';

const directoryQuestion: PromptObject = {
  name: 'rootDirectory',
  type: 'text',
  message: `${blue('Enter the root directory: ')}`,
  initial: './',
  validate: value => {
    if (fs.existsSync(value)) {
      return true;
    }

    return "😱 Sorry! The directory doesn't exist, please try again";
  },
};

export default directoryQuestion;
