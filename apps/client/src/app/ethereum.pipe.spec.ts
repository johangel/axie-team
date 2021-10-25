import { EthereumPipe } from './ethereum.pipe';

describe('EthereumPipe', () => {
  it('Should parse 1000000000000000000 to 1.00', () => {
    const pipe = new EthereumPipe();
    expect(pipe.transform('1000000000000000000')).toBe('1.00');
  });
});
