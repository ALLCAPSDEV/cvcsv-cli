import inquirer from 'inquirer';
import {Logger} from './utils/logger';
import {bucketQuestion, directoryQuestion, productCategoryQuestion, productSetQuestion} from './questions';
import clear from 'clear';
import {buildData} from './buildData';
import {writeToFile} from './writeToFile';

clear();
const logger = new Logger;
logger.showTitleAndBanner();

inquirer.prompt([
  directoryQuestion,
  bucketQuestion,
  productCategoryQuestion,
  productSetQuestion,
]).then(async (answers) => {
  const directory: string = answers.directory.match(/\/$/) ? answers.directory : `${answers.directory}/`;
  const data = await buildData(answers.bucket, directory, answers.productCategory, answers.productSet, logger);
  const file = (data) ? await writeToFile(data, `${directory}imgTest.csv`) : false;
  if (file) logger.success();
});
