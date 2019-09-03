import {Question} from 'inquirer';
import {blue} from 'kleur';

const bucketQuestion: Question = {
  name: 'bucket',
  type: 'input',
  message: `${blue("Enter the name of the Storage Bucket where the images are stored: ")}`,
  default: 'some-google-cloud-storage-bucket',
}

export default bucketQuestion;