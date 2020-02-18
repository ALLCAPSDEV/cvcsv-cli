import { blue } from 'kleur';
import { PromptObject } from 'prompts';

const verticesQuestion: PromptObject = {
  name: 'vertices',
  type: 'confirm',
  message: `${blue(
    'Would you like to use Object Localizer to add normalised vertices?'
  )}`
};

export default verticesQuestion;
