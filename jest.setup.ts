import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret-key-at-least-32-chars-long-!!!';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as any;
}

// Simple polyfills for Request, Response, Headers for Jest/Node environment
if (typeof global.Request === 'undefined') {
  class MockHeaders extends Map {
    append(name: string, value: string) { this.set(name.toLowerCase(), value); }
    get(name: string) { return super.get(name.toLowerCase()) || null; }
  }
  class MockRequest {
    constructor(public input: string, public init?: any) {}
    get url() { return this.input; }
    get headers() { return new MockHeaders(); }
  }
  class MockResponse {
    constructor(public body?: any, public init?: any) {}
    get status() { return this.init?.status || 200; }
    async json() { return typeof this.body === 'string' ? JSON.parse(this.body) : this.body; }
    static json(data: any) { return new MockResponse(data); }
    static next() { return new MockResponse(); }
    static redirect(url: string) { return new MockResponse(null, { status: 302, headers: { location: url } }); }
  }

  global.Request = MockRequest as any;
  global.Response = MockResponse as any;
  global.Headers = MockHeaders as any;
}

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    to: jest.fn(),
    fromTo: jest.fn(),
    from: jest.fn(),
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() })),
  usePathname: jest.fn(() => '/admin'),
  useSearchParams: jest.fn(() => ({ 
    get: jest.fn((key) => null),
    has: jest.fn((key) => false),
  })),
}));

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ type: 'redirect', url, json: async () => ({}) })),
    next: jest.fn(() => ({ type: 'next', json: async () => ({}) })),
    json: jest.fn((data) => ({ type: 'json', data, json: async () => data })),
  },
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: any) => children,
}));

// Mock jose (now using global mock in jest.config.js)
jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mocked-token'),
  })),
  jwtVerify: jest.fn().mockResolvedValue({ payload: { section: '102', row: 'G', seat: '14' } }),
}));

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({ type: 'firestore' })),
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ type: 'auth' })),
}));

// Mock localStorage
if (typeof window !== 'undefined') {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
      removeItem: jest.fn((key: string) => { delete store[key]; }),
      clear: jest.fn(() => { store = {}; }),
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
}

// Mock GSAP
jest.mock('gsap', () => ({
  fromTo: jest.fn((targets, from, to) => {
    if (to && to.onComplete) to.onComplete();
    return { kill: jest.fn() };
  }),
  to: jest.fn((targets, to) => {
    if (to && to.onComplete) to.onComplete();
    return { kill: jest.fn() };
  }),
  set: jest.fn(),
  timeline: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    to: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    kill: jest.fn(),
  })),
}));

// Mock Lucide icons as simple functional components
jest.mock('lucide-react', () => {
  const React = require('react');
  return new Proxy({}, {
    get: (target, name) => (props: any) => React.createElement('div', props, name as string)
  });
});
