jest.mock('fs');
import * as fs from 'fs';
import { getBoundingPoly } from '../../src/utils/getBoundingPoly';

describe('getBoundingPoly', () => {
  let mockFs: jest.SpyInstance<any, unknown[]>;
  beforeEach(() => {
    mockFs = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => Buffer.from('test.jpg', 'utf8'));
  });
  afterEach(() => {
    mockFs.mockRestore();
  });
  test('returns data in the correct format', async () => {
    const expected = [
      {
        name: 'Foo',
        score: 0.3423524,
        bounds: [0.1, 0.1, 0.7, 0.7, 0.7, 0.1, 0.1, 0.7]
      }
    ];
    const result = await getBoundingPoly('test.jpg');
    expect(result).toEqual(expected);
  });
  test('mockFs is called', async () => {
    await getBoundingPoly('test.jpg');
    expect(mockFs).toBeCalledTimes(1);
  });
});
