import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Game() {
  const location = useLocation();
  const [clickedCircle, setClickedCircle] = useState(false);


  function show() {
    setClickedCircle(true);
    const timer = setTimeout(() => {
      setClickedCircle(false); 
    }, 1000); 

    
    return () => clearTimeout(timer);
  }

  
  function generateTable() {
    const table = [];
    const numbers = [];
  
    const totalCircles = location.state.settings.size * location.state.settings.size;
    const halfCircles = Math.floor(totalCircles / 2);
    for (let i = 0; i < halfCircles; i++) {
      numbers.push(i + 1);
    }
    for (let i = 0; i < halfCircles; i++) {
      numbers.push((i % halfCircles) + 1);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    let index = 0;
  
    for (let i = 0; i < location.state.settings.size; i++) {
      const circles = [];
  
      for (let j = 0; j < location.state.settings.size; j++) {
        const number = numbers[index];
        index++;
        
       

        circles.push(
          <div
            key={j}
            className="bg-background w-[72.53px] h-[72.53px] mt-3 rounded-full flex items-center justify-center text-white text-[40px] "
            onClick={show}
            >
           <span className={`${clickedCircle ? "" : "hidden"}`}>{number}</span>
          </div>
        );
      }
  
      table.push(
        <div key={i} className="flex gap-y-4">
          {circles}
        </div>
      );
    }
  
    return table;
  }

  return (
    <>
      <div className="m-5">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px]">memory</h1>
          <div className="bg-yellow rounded-[26px]">
            <h1 className="text-[16px] pt-2 pb-2 pl-4 pr-4 text-white">Menu</h1>
          </div>
        </div>
        <div className="mt-[85px] ml-5 mr-5">{generateTable()}</div>
      </div>
    </>
  );
}

export default Game;
