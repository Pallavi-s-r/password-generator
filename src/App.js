import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const[length , setLength]= useState(8);
  const[number , setNumber]= useState(false);
  const[character , setCharacter]= useState(false);
const [password, setPassword] = useState("");


const passwordRef = useRef(null);

//useCallback to optimize the code mostly
const passwordGenerator= useCallback(()=>{
  let pass = "";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(number) str+="0123456789"
  if(character) str+="!@#$%^&*(){}?><"


for(let i = 1; i <= length; i++){
let char = Math.floor(Math.random()*str.length + 1);
 pass += str.charAt(char);
}

setPassword(pass);
},[length,number,character,setPassword]) //memoization concept comes here that is why we have used setPassword


//we are using useeffect here to re run if ther is any change in dependencies of useeffect

useEffect(()=>{passwordGenerator()},
[length,number,character]);
// passwordGenerator();//React limits the number of renders to prevent an infinite loop.

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()//through this line wr are showing the blue selection on ui
  // passwordRef.current?.setSelectionRange(0,3); //out of all the length we are selection only 3 characters

  window.navigator.clipboard.writeText(password)
},[password])


  return (
    <div className="App">
   <h1>Password generator</h1>
   <div>
    <input type="text" value={password}  ref={passwordRef}/>
<button onClick={copyPasswordToClipboard}>Copy</button>
   </div>
<div>
  <input type='range' min={6} max={15}
  value={length} onChange={(e)=>{setLength(e.target.value)}}/>
  <label>length:{length}</label>
</div>
<div>
  <input type='checkbox' defaultChecked={number} onChange={()=>{setNumber(((prev)=>!prev))}}/>
  <label>Numbers</label>
</div>
<div>
  <input type='checkbox' defaultChecked={character} onChange={()=>{setCharacter(((prev)=>!prev))}}/>
  <label>character</label>
</div>
    </div>
  );
}

export default App;
