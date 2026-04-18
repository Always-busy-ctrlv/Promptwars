const SignJWT = jest.fn().mockImplementation((payload) => ({
  setProtectedHeader: jest.fn().mockReturnThis(),
  setIssuedAt: jest.fn().mockReturnThis(),
  setExpirationTime: jest.fn().mockReturnThis(),
  sign: jest.fn().mockResolvedValue('mocked-token'),
}));

const jwtVerify = jest.fn().mockResolvedValue({
  payload: { section: '102', row: 'G', seat: '14' }
});

module.exports = {
  SignJWT,
  jwtVerify
};
