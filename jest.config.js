const baseDir = '<rootDir>/__test__/';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
  collectCoverage: true,
  testMatch: [`${baseDir}/**/*test.tsx`], // Match test files
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/data/fileMock.js',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
