import { blue } from 'kleur';
import { PromptObject } from 'prompts';

const filenameQuestion: PromptObject = {
  name: 'csvFilename',
  type: 'text',
  message: `${blue('What would you like the output file to be called?')}`,
  initial: 'images.csv',
};

export default filenameQuestion;
