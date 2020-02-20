import { blue } from "kleur";
import { Choice, ProductCategoryChoiceValue } from "../interfaces/CLI";
import { PromptObject } from "prompts";

const listOfProductCategories: Choice[] = [
  {
    title: "apparel",
    value: ProductCategoryChoiceValue.APPAREL
  },
  {
    title: "home goods",
    value: ProductCategoryChoiceValue.HOMEGOODS
  },
  {
    title: "packaged goods",
    value: ProductCategoryChoiceValue.PACKAGEDGOODS
  },
  {
    title: "toys",
    value: ProductCategoryChoiceValue.TOYS
  }
];

const productCategoryQuestion: PromptObject = {
  name: "productCategory",
  type: "select",
  message: `${blue("Which product category are these images for?")}`,
  choices: listOfProductCategories,
  hint: " - Space to select"
};

export default productCategoryQuestion;
