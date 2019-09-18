import { InputQuestion } from "inquirer";
import { blue } from "kleur";

const bucketQuestion: InputQuestion = {
  name: "bucketName",
  type: "input",
  message: `${blue(
    "Enter the name of the Storage Bucket where the images are stored: "
  )}`,
  default: "gcp-storage-bucket"
};

export default bucketQuestion;
