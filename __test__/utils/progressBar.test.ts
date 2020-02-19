import { ProgressBar } from '../../src/utils/progressBar';
import { bgBlue } from 'kleur';

describe('ProgressBar', () => {
  let subject: ProgressBar;
  beforeEach(() => {
    subject = new ProgressBar();
  });
  describe('#start', () => {
    const origUpdate = ProgressBar['update'];
    beforeEach(() => {
      subject.update = jest.fn();
      subject.start(10);
    });
    afterEach(() => {
      subject.update = origUpdate;
    });
    it('sets the total', () => {
      expect(subject['total']).toEqual(10);
    });
    it('sets current to 0', () => {
      expect(subject['current']).toEqual(0);
    });
    it('calls #update', () => {
      expect(subject.update).toBeCalledWith(0);
    });
  });
  describe('#update', () => {
    const origDraw = ProgressBar['draw'];
    beforeEach(() => {
      subject['draw'] = jest.fn();
      subject['total'] = 10;
      subject.update(5);
    });
    afterEach(() => {
      subject['draw'] = origDraw;
    });
    it('updates the current amount', () => {
      expect(subject['current']).toEqual(5);
    });
    it('calls #draw', () => {
      expect(subject['draw']).toBeCalledWith(0.5);
    });
  });
  describe('#draw', () => {
    let mockWrite: jest.SpyInstance<
      boolean,
      [string | Uint8Array, string?, ((err?: Error) => void)?]
    >;
    beforeEach(() => {
      mockWrite = jest
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      subject['size'] = 10;
      subject['draw'](0.5);
    });
    afterEach(() => {
      mockWrite.mockRestore();
    });
    it('writes to stdout', () => {
      const filledBar = bgBlue('     ');
      const emptyBar = '\u2591\u2591\u2591\u2591\u2591';
      const progressPercent = (0.5 * 100).toFixed(2);
      expect(mockWrite).toBeCalledWith(
        `Current progress: [${filledBar}${emptyBar}] | ${progressPercent}%`
      );
    });
  });
});
