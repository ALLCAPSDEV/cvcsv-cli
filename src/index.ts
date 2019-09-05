import inquirer from 'inquirer';
import {Logger} from './utils/logger';
import {bucketQuestion, directoryQuestion, fileLocationQuestion, productCategoryQuestion, productSetQuestion, filenameQuestion} from './questions';
import clear from 'clear';
import {buildData} from './buildData';
import {writeToFile} from './writeToFile';

clear();
const logger = new Logger;
logger.showTitleAndBanner();

inquirer.prompt([
  directoryQuestion,
  filenameQuestion,
  fileLocationQuestion,
  bucketQuestion,
  productCategoryQuestion,
  productSetQuestion,
]).then(async (answers) => {
  const directory: string = answers.directory.match(/\/$/) ? answers.directory : `${answers.directory}/`;
  const fileDir: string = answers.fileloc.match(/\/$/) ? answers.fileloc : `${answers.fileloc}/`;
  const data = await buildData(answers.bucket, directory, answers.productCategory, answers.productSet, logger);
  const file = (data) ? await writeToFile(data, `${fileDir}${answers.filename}`) : false;
  if (file && data) logger.success(data.length);
});
