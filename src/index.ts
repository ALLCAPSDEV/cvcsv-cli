import inquirer from 'inquirer';
import {Logger} from './utils/logger';
import {bucketQuestion, directoryQuestion} from './questions';
import clear from 'clear';

clear();
const logger = new Logger;
logger.showTitleAndBanner();

inquirer.prompt([
  directoryQuestion,
  bucketQuestion
]).then(answer => console.log(answer))
