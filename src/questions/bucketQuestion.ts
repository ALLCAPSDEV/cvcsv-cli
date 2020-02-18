import { blue } from "kleur";
import { PromptObject } from "prompts";

const bucketQuestion: PromptObject = {
  name: "bucketName",
  type: "text",
  message: `${blue(
    "Enter the name of the Storage Bucket where the images are stored: "
  )}`,
  initial: "gcp-storage-bucket"
};

export default bucketQuestion;
