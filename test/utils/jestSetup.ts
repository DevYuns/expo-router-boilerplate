import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// const customGlobal: any = global;

// customGlobal.fetch = require('jest-fetch-mock');
// customGlobal.fetchMock = customGlobal.fetch;

// const mockQueryBuilder = {
//   eq: jest.fn().mockReturnValue(),
// };

// jest.mock('../../src/supabase', () => ({
//   __esModule: true,
//   supabase: {
//     from: (data?: any) =>
//       jest.fn(() => ({
//         select: (arg?: any) => jest.fn(() => Promise.resolve(data)),
//       })),
//   },
// }));

// jest.mock('../../src/supabase', () => ({
//   _esModule: true,
//   supabase: {
//     from: () => () => jest.fn(),
//   },
// }));

if (!global.Window) {
  Object.defineProperty(global, 'Window', {
    value: window.constructor,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}
