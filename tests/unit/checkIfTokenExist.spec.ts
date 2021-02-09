import jwtConfig from '../../src/configs/jwtConfig';

describe('jwtConfig', () => {
  it('should have more than 32 characters', () => {
    expect(jwtConfig.jwtSecret).toHaveLength(32); // tem que ter 32 caracteres

    expect(typeof jwtConfig.jwtSecret).toBe('string'); // tem que ser string
  });
});
