import { Question } from 'inquirer';
import { blue } from 'kleur';

const productSetQuestion: Question = {
  name: 'productSet',
  type: 'input',
  message: `${blue("Enter the product set id: ")}`,
  default: 'test-product-set'
}

export default productSetQuestion;