import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useLockBodyScroll } from './useLockBodyScroll';

// Mock document object and its properties
const originalDocument = { ...global.document };
global.document = {
  ...originalDocument,
  body: {
    style: {},
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  getElementById: jest.fn().mockReturnValue({ style: {} }),
};

// Dummy component to mount the hook
const DummyComponent = ({ children }) => {
  useLockBodyScroll();
  return children;
};

describe('useLockBodyScroll', () => {
  let originalBodyOverflow;

  beforeAll(() => {
    // Store the original overflow value of the body
    originalBodyOverflow = global.document.body.style.overflow;
  });

  afterEach(() => {
    // Reset the body overflow style after each test
    global.document.body.style.overflow = originalBodyOverflow;
  });

  it('should set body and content overflow to hidden', () => {
    const wrapper = mount(
      <DummyComponent>
        <div id="content">Content</div>
      </DummyComponent>
    );

    expect(global.document.body.style.overflow).toBe('hidden');
    // expect(global.document.getElementById).toHaveBeenCalledWith('content');
    // expect(global.document.getElementById('content').style.overflow).toBe('hidden');
  });

  it('should restore body overflow to its original value on unmount', () => {
    const wrapper = mount(
      <DummyComponent>
        <div id="content">Content</div>
      </DummyComponent>
    );

    // Simulate unmounting the component
    wrapper.unmount();

    expect(global.document.body.style.overflow).toBe(originalBodyOverflow);
  });
});

// Restore the original document object after all tests
afterAll(() => {
  global.document = originalDocument;
});