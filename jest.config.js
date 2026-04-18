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
  },
  testPathIgnorePatterns: [
    '<rootDir>/src/__tests__/lib/qr-generator.test.ts', // jose ESM not compatible with jest
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
    '!src/lib/firebase.ts',           // Firebase SDK config — integration test only
    '!src/lib/qr-generator.ts',       // jose ESM — integration test only
    '!src/app/api/auth/**',           // NextAuth — requires real OAuth secrets
  ],
};

module.exports = createJestConfig(customJestConfig);
