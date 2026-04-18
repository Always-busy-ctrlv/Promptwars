const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^jose$': '<rootDir>/src/__mocks__/jose.js',
    '^openid-client$': '<rootDir>/src/__mocks__/openid-client.js',
    '^@panva/hkdf$': '<rootDir>/node_modules/@panva/hkdf/dist/node/cjs/index.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jose|next-auth|openid-client|@panva/hkdf)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
    '!src/app/api/auth/[...nextauth]/route.ts', // Entry point only
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
