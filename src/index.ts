import inquirer from 'inquirer';
import {Logger} from './utils/logger';
import {bucketQuestion, directoryQuestion, fileLocationQuestion, productCategoryQuestion, productSetQuestion, filenameQuestion} from './questions';
// import {buildData} from './buildData';
// import {writeToFile} from './writeToFile';
import program from 'commander';

const logger = new Logger;
logger.showTitleAndBanner();

program.command('init')
       .description('Initialise the settings')
       .action(() => {
          logger.msg("This action is going to create a config file in this dir");
          inquirer.prompt([
            directoryQuestion,
            filenameQuestion,
            fileLocationQuestion,
            bucketQuestion,
            productCategoryQuestion,
            productSetQuestion,
          ]).then(async (answers) => {
            console.log(answers);
          })
       })

program.parse(process.argv);

// inquirer.prompt([
//   directoryQuestion,
//   filenameQuestion,
//   fileLocationQuestion,
//   bucketQuestion,
//   productCategoryQuestion,
//   productSetQuestion,
// ]).then(async (answers) => {
//   const directory: string = answers.directory.match(/\/$/) ? answers.directory : `${answers.directory}/`;
//   const fileDir: string = answers.fileloc.match(/\/$/) ? answers.fileloc : `${answers.fileloc}/`;
//   const data = await buildData(answers.bucket, directory, answers.productCategory, answers.productSet, logger);
//   const file = (data) ? await writeToFile(data, `${fileDir}${answers.filename}`) : false;
//   if (file && data) logger.success(data.length);
// });
