import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.HTTP_PORT)

describe('HTTP_PORT', () => {
  it('should have 4 numbers', () => {
    expect(process.env.HTTP_PORT).toHaveLength(4); // tem que ter 32 caracteres
  });
});
