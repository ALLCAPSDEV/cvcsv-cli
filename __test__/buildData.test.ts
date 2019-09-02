import { buildData } from '../src/buildData';

describe('buildData', () => {
  test('without a dirPath', async () => {
    const expected = [
      {
        fileName: '1.jpg',
        dirName: 'test',
        fullPath: 'test/1.jpg',
        'image-uri': 'gs://foo/images/test/1.jpg',
        productId: 'TEST',
        displayName: 'Test '
      },
      {
        fileName: '2.png',
        dirName: 'files',
        fullPath: 'files/2.png',
        'image-uri': 'gs://foo/images/files/2.png',
        productId: 'FILES',
        displayName: 'Files '
      }
    ]
    const result = await buildData('foo');
    expect(result).toEqual(expected);
  })

  test('with a dirPath', async () => {
    const expected = [
      {
        fileName: '1.jpg',
        dirName: 'someFolder/testing',
        fullPath: 'someFolder/testing/1.jpg',
        'image-uri': 'gs://foo/images//testing/1.jpg',
        productId: 'TESTING',
        displayName: ' Testing '
      },
      {
        fileName: '2.png',
        dirName: 'someFolder/anotherDir',
        fullPath: 'someFolder/anotherDir/2.png',
        'image-uri': 'gs://foo/images//anotherDir/2.png',
        productId: 'ANOTHERDIR',
        displayName: ' Anotherdir '
      }
    ]
    const result = await buildData('foo', 'someFolder');
    expect(result).toEqual(expected);
  })
})