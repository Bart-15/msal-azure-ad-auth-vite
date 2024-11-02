import '@testing-library/jest-dom';

jest.mock('./src/config/config', () => ({
  config: {
    AZURE_CLIENT_ID: 'some-text',
    AZURE_AUTHORITY: 'some-text',
  },
}));
