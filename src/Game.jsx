import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";

function Game() {
  const location = useLocation();
  const [clickedCircle, setClickedCircle] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [userChosenNumbers, setUserChosenNumbers] = useState([]);
  const [prevClickedCircle, setPrevClickedCircle] = useState(null);
  const [isCircleClickable, setIsCircleClickable] = useState([]);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [menu, setMenu] = useState(false);
  const lastElement = userChosenNumbers[userChosenNumbers.length - 1];

  useEffect(() => {
    generateNumbers();
    // startTimer();
  }, []);

  function show(index) {
    let number = numbers[index];
    if (!isCircleClickable[index] || matchedNumbers.includes(number)) {
      return;
    }

    pushToArray(number);

    if (number !== lastElement) {
      setIsCircleClickable((prevClickable) => {
        const updatedClickable = [...prevClickable];
        updatedClickable[prevClickedCircle] = true;
        return updatedClickable;
      });
    } else {
      setClickedCircle(number);
      setPrevClickedCircle(lastElement);
      setMatchedNumbers((prevMatched) => [...prevMatched, number]);
    }

    setClickedCircle(index);
    setPrevClickedCircle(index);
  }

  const pushToArray = (number) => {
    setUserChosenNumbers((prevArray) => [...prevArray, number]);
  };

  useEffect(() => {
    if (clickedCircle !== null) {
      const updatedClickable = [...isCircleClickable];
      updatedClickable[clickedCircle] = false;
      setIsCircleClickable(updatedClickable);
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
              className={`${
                matchedNumbers.includes(number) || clickedCircle === circleIndex
                  ? ""
                  : "hidden"
              }`}
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
  useEffect(() => {
    if (
      matchedNumbers.length === numbers.length / 2 &&
      numbers.length / 2 > 0
    ) {
      stopTimer();
      setGameEnded(true);
    }
  }, [matchedNumbers, numbers.length]);

  function startTimer() {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.5);
    }, 1000);
    return () => clearInterval(intervalId);
  }
  function showMenu() {
    setMenu(!menu);
  }
  function stopTimer() {
    // clearInterval(startTimer());
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px]">memory</h1>
          <div className="bg-yellow rounded-[26px]">
            <h1
              className="text-[16px] pt-2 pb-2 pl-4 pr-4 text-white"
              onClick={showMenu}
            >
              Menu
            </h1>
          </div>
        </div>
        <div className="mt-[85px] ml-5 mr-5">{generateTable()}</div>
        <div className="flex gap-6 mt-[100px] justify-center">
          <div className="bg-gray pr-[35px] pl-[35px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center">
            <h1 className="text-tGray  text-[15px]">Time</h1>
            <h1 className="text-center">{timer}</h1>
          </div>
          <div className="bg-gray pr-[35px] pl-[35px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center">
            <h1 className="text-tGray text-[15px]">Moves</h1>
            <h1 className="text-center">{userChosenNumbers.length}</h1>
          </div>
        </div>
        {gameEnded && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white fixed top-0  flex flex-col  mt-[146px] pt-[32px] pb-[24px] pl-[24px] pr-[24px] rounded-lg">
              <h1 className="text-2xl font-bold text-background text-center">
                You did it!
              </h1>
              <p className="text-center text-[14px] text-tGray">
                Game over! Here’s how you got on…
              </p>
              <div className="mt-[24px] flex flex-row justify-between bg-gray rounded-lg p-[14px]">
                <p className="text-[13px] text-center text-tGray p-0">
                  Time Elapsed
                </p>
                <p className="text-background">{timer}</p>
              </div>
              <div className="mt-2 flex flex-row justify-between bg-gray rounded-lg p-[14px]">
                <p className="text-[13px] text-center text-tGray p-0">
                  Moves Taken
                </p>
                <p className="text-background">
                  {userChosenNumbers.length} Moves
                </p>
              </div>
              <div
                className="bg-yellow rounded-[26px] mt-[24px] pt-3 pb-3"
                onClick={refresh}
              >
                <p className="text-center text-white">Restart</p>
              </div>
              <Link to={{ pathname: "/" }}>
                <div className="bg-gray rounded-[26px] mt-[16px] pt-3 pb-3">
                  <p className="text-center text-background">Setup New Game</p>
                </div>
              </Link>
            </div>
          </div>
        )}
        {menu && (
          <div className="fixed top-0 left-0 w-screen h-screen  flex items-center justify-center bg-black pl-[24px] pr-[24px] bg-opacity-50 ">
            <div className="bg-white fixed top-20 flex flex-col  mt-[146px] w-[327px]  pb-[24px] pl-[24px] pr-[24px] rounded-lg ">
              <div
                className="bg-yellow rounded-[26px]  mt-[24px] pt-3 pb-3"
                onClick={refresh}
              >
                <p className="text-center text-white">Restart</p>
              </div>
              <Link to={{ pathname: "/" }}>
                <div className="bg-gray rounded-[26px] mt-[16px] pt-3 pb-3">
                  <p className="text-center text-background">New Game</p>
                </div>
              </Link>
              <div
                className="bg-yellow rounded-[26px] mt-[24px] pt-3 pb-3"
                onClick={showMenu}
              >
                <p className="text-center text-white">Resume Game</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Game;
