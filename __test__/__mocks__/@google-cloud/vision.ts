export class ImageAnnotatorClient {
  objectLocalization(request: {
    image: {
      content: Buffer;
    };
  }) {
    return new Promise(res => {
      return res([
        {
          localizedObjectAnnotations: [
            {
              name: 'Foo',
              score: 0.3423524,
              boundingPoly: {
                normalizedVertices: [
                  {
                    x: 0.1,
                    y: 0.1
                  },
                  {
                    x: 0.7,
                    y: 0.7
                  },
                  {
                    x: 0.7,
                    y: 0.1
                  },
                  {
                    x: 0.1,
                    y: 0.7
                  }
                ]
              }
            }
          ]
        }
      ]);
    });
  }
}
