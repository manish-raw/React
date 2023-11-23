import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback( ()=> {
    let passwordCarrier="";
    let str="ABCDEFGHIJKLMNOPQRESTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) str +="~!@#$%^&*()_-+{}[]/";
    if(numberAllowed) str += "0123456789";
    for (let i = 1; i<= length; i++) {
      const index = Math.floor( Math.random() * str.length + 1 );
      passwordCarrier += str.charAt(index);
      setPassword(passwordCarrier);
    }
    
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{ passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className='text-white max-w-md mx-auto px-4 py-3 my-8 rounded-lg bg-gray-600'>

        <h1 className='text-center text-white text-2xl my-4'>Password Generator</h1>
        <div className='flex text-black rounded-lg overflow-hidden shadow mb-4' >
            <input 
            type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordRef}
            readOnly
            />
            <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-500 p-1 text-white' >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={5}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={ (e)=> {setlength(e.target.value)} }
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={ ()=> {setNumberAllowed((prev) => !prev )} }
              />
              <label  htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={ ()=> {setCharAllowed((prev) => !prev )} }
              />
              <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
