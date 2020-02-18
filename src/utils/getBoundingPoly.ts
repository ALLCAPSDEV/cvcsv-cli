import * as vision from "@google-cloud/vision";
import * as fs from "fs";
import {
  LocalizedObjectAnnotation,
  NormalizedVertex
} from "../interfaces/objectLocalizationResponse";

export const getBoundingPoly = async (filePath: string) => {
  const client = new vision.ImageAnnotatorClient();
  const request = {
    image: { content: fs.readFileSync(filePath) }
  };
  const [result] = await client.objectLocalization(request);
  const objects: LocalizedObjectAnnotation[] =
    result.localizedObjectAnnotations;
  const data = objects.reduce<
    {
      name: string;
      score: number;
      bounds: NormalizedVertex[];
    }[]
  >((acc, obj) => {
    const name = obj.name;
    const score = obj.score;
    const bounds = obj.boundingPoly.normalizedVertices;
    acc.push({
      name,
      score,
      bounds
    });
    return acc;
  }, []);
  return data;
};
