import {
  directoryQuestion,
  filenameQuestion,
  fileLocationQuestion,
  bucketQuestion,
  productCategoryQuestion,
  productSetQuestion
} from ".";

const fullQuestions = [
  directoryQuestion,
  filenameQuestion,
  fileLocationQuestion,
  bucketQuestion,
  ...productCategoryQuestion,
  productSetQuestion
];

export default fullQuestions;
