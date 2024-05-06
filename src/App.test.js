import App from "./App";
import {  shallow } from "enzyme";
// import Adapter from "@cfaester/enzyme-adapter-react-18";
// Enzyme.configure({ adapter: new Adapter() });
/**
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttri = (wrapper, val) => wrapper.find(`[data-test='${val}']`);
test("renders without error", () => {
  const wrapper = setup();

  const appComponent = findByTestAttri(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("render increment button", () => {
  const wrapper = setup();
  const button = findByTestAttri(wrapper, "increament-button"); 
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterdisplay = findByTestAttri(wrapper, "counter-display");
  expect(counterdisplay.length).toBe(1);
});

test("counter display starts with 0", () => {
  const wrapper = setup();
  const countSpan = findByTestAttri(wrapper, "count");
  expect(countSpan.text()).toBe("0");
});

test("clicking the button increament counter display", () => {
  // find the button
  const wrapper = setup()
 const button = findByTestAttri(wrapper, 'increament-button')
  // click the button
  button.simulate('click')
  // check the counter value
  const counterSpan = findByTestAttri(wrapper, 'count').text()
  expect(counterSpan).toBe('1')
});


test('Decreament the counter on decrement button is clicked ',()=>{
  const wrapper = setup()
  const decrementcounterButton  = findByTestAttri(wrapper, 'decreament-counter')
  decrementcounterButton.simulate('click')
  
  const counterSpan = findByTestAttri(wrapper, 'count').text()
  if(counterSpan == 0 ){
    const errorMessage = findByTestAttri(wrapper, 'counter-error')
    expect(errorMessage.length).toBe(1);
  }
  // expect(counterSpan).toBe('')
})