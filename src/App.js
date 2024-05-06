
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [error, setError ] = useState(false)

  const clickHandler = (op) =>{
    if(op==='inc' ) {
      if(count ==0 ) {
        setError(false)
      }
      setCount(count+1)
    }else if(op==='dec'){
      if(count == 0 ) {
        setError(true)
      }else{
        setCount(count-1)
      }
      
    }
  }
   return (
    <div className="App" data-test="component-app">
    <h1 data-test="counter-display">Counter is <span data-test='count'>{count}</span></h1>
    <button data-test="increament-button" onClick={()=> clickHandler('inc')}>Increament Counter</button>
    <button data-test="decreament-counter" onClick={()=> clickHandler('dec')}>Increament Counter</button>
    {
      error && <p data-test='counter-error'>Counter can not be less than 0</p>
    } 
    </div>
  );
}

export default App;
