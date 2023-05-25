import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Game() {
  const location = useLocation();
  const [clickedCircle, setClickedCircle] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [userChosenNumbers, setUserChosenNumbers] = useState([]);
  const [prevClickedCircle, setPrevClickedCircle] = useState(null);
  const [isCircleClickable, setIsCircleClickable] = useState([]);

  useEffect(() => {
    generateNumbers();
  }, []);

  function show(index) {
    if (!isCircleClickable[index]) {
      return;
    }

    const number = numbers[index];
    pushToArray(number);
    console.log(userChosenNumbers);
    const lastElement = userChosenNumbers[userChosenNumbers.length - 1];

    if (number !== lastElement) {
      setIsCircleClickable((prevClickable) => {
        const updatedClickable = [...prevClickable];
        updatedClickable[prevClickedCircle] = true;
        return updatedClickable;
      });
    }

    setClickedCircle(index);
    setPrevClickedCircle(index);
    console.log(lastElement);
  }

  const pushToArray = (number) => {
    setUserChosenNumbers((prevArray) => [...prevArray, number]);
  };

  useEffect(() => {
    if (clickedCircle !== null) {
      const updatedClickable = [...isCircleClickable];
      updatedClickable[clickedCircle] = false;
      setIsCircleClickable(updatedClickable);

      setTimeout(() => {
        setClickedCircle(null);
      }, 1000);
    }
  }, [clickedCircle]);

  function generateNumbers() {
    const totalCircles =
      location.state.settings.size * location.state.settings.size;
    const halfCircles = Math.floor(totalCircles / 2);
    const newNumbers = [];

    for (let i = 0; i < halfCircles; i++) {
      newNumbers.push(i + 1);
    }
    for (let i = 0; i < halfCircles; i++) {
      newNumbers.push((i % halfCircles) + 1);
    }
    for (let i = newNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newNumbers[i], newNumbers[j]] = [newNumbers[j], newNumbers[i]];
    }

    setNumbers(newNumbers);
    setIsCircleClickable(new Array(totalCircles).fill(true));
  }

  function generateTable() {
    const table = [];
    let index = 0;

    for (let i = 0; i < location.state.settings.size; i++) {
      const circles = [];

      for (let j = 0; j < location.state.settings.size; j++) {
        const circleIndex = index++;
        const number = numbers[circleIndex];

        circles.push(
          <div
            key={circleIndex}
            className="bg-background w-[72.53px] h-[72.53px] mt-3 rounded-full flex items-center justify-center text-white text-[40px] "
            onClick={() => {
              show(circleIndex);
            }}
          >
            <span
              className={`${clickedCircle === circleIndex ? "" : "hidden"}`}
            >
              {number}
            </span>
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
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px]">memory</h1>
          <div className="bg-yellow rounded-[26px]">
            <h1 className="text-[16px] pt-2 pb-2 pl-4 pr-4 text-white">Menu</h1>
          </div>
        </div>
        <div className="mt-[85px] ml-5 mr-5">{generateTable()}</div>
        <div className="flex gap-6 mt-[100px]">
          <div className="bg-gray">
            <h1>Time</h1>
          </div>
          <div className="bg-gray">
            <h1>Moves</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
