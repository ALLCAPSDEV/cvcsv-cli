import { blue } from 'kleur';
import { PromptObject } from 'prompts';

const productSetQuestion: PromptObject = {
  name: 'productSet',
  type: 'text',
  message: `${blue('Enter the product set id: ')}`,
  initial: 'test-product-set',
};

export default productSetQuestion;
