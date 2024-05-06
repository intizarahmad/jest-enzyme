import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import useOutsideClick from './useClickOutside'; // Import your custom hook

describe('useOutsideClick', () => {
  it('should remove event listener on unmount', () => {
    const callback = jest.fn();
    const Component = () => {
      const ref = useOutsideClick(callback);
      return (
        <div ref={ref} data-testid="container">
          Click inside
        </div>
      );
    };

    const wrapper = mount(<Component />);
    const container = wrapper.find('[data-testid="container"]').getDOMNode();

    const outsideElement = document.createElement('span');
    document.body.appendChild(outsideElement);

    outsideElement.click();
    expect(callback).toHaveBeenCalled();

    wrapper.unmount(); // Simulate unmounting the component

    outsideElement.click();
    expect(callback).toHaveBeenCalledTimes(1); // Ensure callback is not called again after unmount

    document.body.removeChild(outsideElement);
  });
});