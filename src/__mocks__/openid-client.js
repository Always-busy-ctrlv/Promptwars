module.exports = {
  Issuer: {
    discover: jest.fn().mockResolvedValue({
      Client: jest.fn().mockImplementation(() => ({
        authorizationUrl: jest.fn().mockReturnValue('https://google.com'),
        callbackParams: jest.fn().mockReturnValue({}),
        callback: jest.fn().mockResolvedValue({}),
      })),
    }),
  },
};
