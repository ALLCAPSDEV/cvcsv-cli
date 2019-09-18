import { ListQuestion } from "inquirer";
import { blue } from "kleur";
import { Choice, ProductCategoryChoiceValue } from "../interfaces/CLI";

const listOfProductCategories: Choice[] = [
  {
    name: "apparel",
    value: ProductCategoryChoiceValue.APPAREL
  },
  {
    name: "home goods",
    value: ProductCategoryChoiceValue.HOMEGOODS
  },
  {
    name: "packaged goods",
    value: ProductCategoryChoiceValue.PACKAGEDGOODS
  },
  {
    name: "toys",
    value: ProductCategoryChoiceValue.TOYS
  }
];

const productCategoryQuestion: ListQuestion = {
  name: "productCategory",
  type: "list",
  message: `${blue("Which product category are these images for?")}`,
  choices: listOfProductCategories
};

export default productCategoryQuestion;
