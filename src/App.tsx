import { FormEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function total(arr:number[]) {
  if(!arr || arr.length === 0) return 0;
  return arr.reduce((acc, cur) => acc + cur, 0);
}

function App() {
  //const [newNumber, setNewNumber] = useState('');
  const [queue, setQueue] = useState<number[][]>([[1,2,3],[10],[6,7]]);

  useEffect(()=>{
    console.log("useEffect");
    const clock = setInterval(()=>{
      console.log("running clock");
      setQueue(prev => prev.map((cart)=>{
        if (cart.length>0) {
          cart[0]--;
          if (cart[0] <= 0) {
            cart.shift();
          }
        }
        return cart;
      }))
    }, 1000);

    return ()=>clearInterval(clock)
    
  },[setQueue])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    //console.log(event);
    //console.log(event.currentTarget.elements.userInput.value);
    //console.log(total([1,2,3]));
    //let newCart = event.currentTarget.elements.userInput.value;
    //if (newCart === null || newCart === undefined ) return;
    //let newCartInt = parseInt(newCart)
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    //const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson);
    console.log(formData.get("number"))
    let newCartInt = parseInt(formData.get("number") as string);
    if (!newCartInt) return;
    let minCount = Infinity;
    let minInd = 0;
    for (let i=0; i<queue.length; i++) {
      let count = total(queue[i]);
      if (count < minCount) {
        minCount = count;
        minInd = i;
      }
    }
    console.log(minCount, minInd)
    //queue[minInd].push(newCart);
    let nextQueue = [...queue];
    nextQueue[minInd].push(Number(newCartInt));
    console.log(nextQueue)
    setQueue(nextQueue);
  }

  return (
    <>
      <h3>Queue Challenge</h3>
      <form onSubmit={handleSubmit}>
        <input type="number" name="number" id="userInput"/> 
        <button type="submit">checkout</button>
      </form>
      <div id="queues">
        {queue.map((q ,i) => <Queue carts={q} id={"cart"+i} key={"cart"+i}/>)}
      </div>
    </>
  )
}

function Queue({carts, id}:{carts:number[], id:string}) {
  //const [carts, setCarts] = useState<number[]>([]);
  return (
    <div>
      {carts.map((cart, i) => {
        return <div key={id+"person"+i}>{cart}</div>
      })}
    </div>
  )
}

export default App
