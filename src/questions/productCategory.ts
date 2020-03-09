import { blue } from 'kleur';
import { Choice, ProductCategoryChoiceValue } from '../interfaces/CLI';
import { PromptObject } from 'prompts';

const listOfProductCategories: Choice[] = [
  {
    title: 'apparel',
    value: ProductCategoryChoiceValue.APPAREL
  },
  {
    title: 'home goods',
    value: ProductCategoryChoiceValue.HOMEGOODS
  },
  {
    title: 'packaged goods',
    value: ProductCategoryChoiceValue.PACKAGEDGOODS
  },
  {
    title: 'toys',
    value: ProductCategoryChoiceValue.TOYS
  }
];

const productCategoryQuestion: PromptObject[] = [
  {
    name: 'productCategory',
    type: 'select',
    message: `${blue('Which product category are these images for?')}`,
    choices: listOfProductCategories,
    hint: ' - Space to select'
  },
  {
    name: 'vertices',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    type: prev =>
      prev === ProductCategoryChoiceValue.PACKAGEDGOODS ? 'toggle' : null,
    message: `${blue(
      'Would you like to use Object Localizer to add normalised vertices?'
    )}`,
    initial: true,
    active: 'yes',
    inactive: 'no'
  }
];

export default productCategoryQuestion;
