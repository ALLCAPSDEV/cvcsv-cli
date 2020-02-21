import * as fs from 'fs';
import { LocalizedObjectAnnotation } from '../interfaces/objectLocalizationResponse';
import { ImageAnnotatorClient } from '@google-cloud/vision';

export const getBoundingPoly = async (
  filePath: string
): Promise<{
  name: string;
  score: number;
  bounds: number[];
}[]> => {
  const client = new ImageAnnotatorClient();
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
      bounds: number[];
    }[]
  >((acc, obj) => {
    const name = obj.name;
    const score = obj.score;
    const bounds = obj.boundingPoly.normalizedVertices.reduce<number[]>(
      (acc, val) => {
        acc.push(val.x);
        acc.push(val.y);
        return acc;
      },
      []
    );
    acc.push({
      name,
      score,
      bounds
    });
    return acc;
  }, []);
  return data;
};
