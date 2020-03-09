import * as fs from 'fs';
import { ImageAnnotatorClient } from '@google-cloud/vision';

export const getBoundingPoly = async (
  filePath: string
): Promise<
  | {
      name?: string | null;
      score?: number | null;
      bounds?: number[];
    }[]
  | undefined
> => {
  const client = new ImageAnnotatorClient();
  const request = {
    image: { content: fs.readFileSync(filePath) }
  };
  if (client.objectLocalization !== undefined) {
    const [result] = await client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    const data = objects?.reduce<
      {
        name?: string | null;
        score?: number | null;
        bounds?: number[];
      }[]
    >((acc, obj) => {
      const name = obj.name;
      const score = obj.score;
      const bounds = obj?.boundingPoly?.normalizedVertices?.reduce<any[]>(
        (acc, val) => {
          acc.push(val?.x);
          acc.push(val?.y);
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
  }
  return;
};
