import { buildData } from '../src/buildData';

describe('buildData', () => {
  test('with a dirPath', async () => {
    const expected = [
      {
        'image-uri': 'gs://foo/images/testing/1.jpg',
        'product-id': 'TESTING',
        'product-display-name': 'Testing ',
        'product-category': 'packagedgood-v1',
        'product-set-id': 'test'
      },
      {
        'image-uri': 'gs://foo/images/another_dir/2.png',
        'product-id': 'ANOTHERDIR',
        'product-display-name': 'Another Dir ',
        'product-category': 'packagedgood-v1',
        'product-set-id': 'test'
      }
    ]
    const result = await buildData('foo', './some/folder/', 'packagedgood-v1', 'test');
    expect(result).toEqual(expected);
  })
})
