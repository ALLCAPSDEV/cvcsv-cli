import {readFiles} from '../src/index';

describe('readfiles', () => {
  it('uses the execution path as default', async() => {
    const result = await readFiles();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toContain('test/1.jpg');
  })  
  it('returns results when a path is added', async () => {
    const result = await readFiles('testDir');
    expect(result).toContain('testDir/testing/1.jpg');
  })
})
