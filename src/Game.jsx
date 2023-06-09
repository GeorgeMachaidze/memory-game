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
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [myInterval, setMyInterval] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [menu, setMenu] = useState(false);
  const lastElement = userChosenNumbers[userChosenNumbers.length - 1];
  let interval;

  useEffect(() => {
    generateNumbers();
    let interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);
    setMyInterval(interval);

    return () => {
      clearInterval(interval);
    };
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

    if (clickedCircle !== null && clickedCircle !== index) {
      setIsCircleClickable((prevClickable) => {
        const updatedClickable = [...prevClickable];
        updatedClickable[clickedCircle] = true;
        return updatedClickable;
      });
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
            className={`bg-background ${
              location.state.settings.size === 4
                ? "w-[74px] md:w-[120px] "
                : "w-[46px] md:w-[82px]"
            } ${
              location.state.settings.size === 4
                ? "h-[74px] md:h-[120px]"
                : "h-[46px] md:h-[82px]"
            }
            ${
              location.state.settings.size === 4
                ? "h-[74px] md:w-[120px]"
                : "h-[46px] md:h-[82px]"
            }
            
            ${
              matchedNumbers.includes(number)
                ? "bg-yellow"
                : clickedCircle === circleIndex
                ? "bg-tGray"
                : "bg-background"
            } 
             mt-3 rounded-full flex items-center justify-center text-white text-40px `}
            onClick={() => {
              show(circleIndex);
            }}
          >
            <span
              className={`${
                matchedNumbers.includes(number) || clickedCircle === circleIndex
                  ? ""
                  : "hidden"
              } ${
                location.state.settings.size === 4
                  ? "text-[40px] md:text-[56px]"
                  : "text-[24px] md:text-[44px]"
              }`}
            >
              {number}
            </span>
          </div>
        );
      }

      table.push(circles);
    }

    return table;
  }
  useEffect(() => {
    if (
      matchedNumbers.length === numbers.length / 2 &&
      numbers.length / 2 > 0
    ) {
      stopTimer(myInterval);
      setGameEnded(true);
    }

    return () => {
      stopTimer(interval);
    };
  }, [matchedNumbers, numbers.length]);

  function stopTimer(interval) {
    clearInterval(interval);
  }
  function showMenu() {
    setMenu(!menu);
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <>
      <div className="p-5 md:p-[38px] lg:p-[175px] lg:pt-[68px]">
        <div className="flex justify-between items-center ">
          <h1 className="text-[24px] md:text-[40px] text-background ">
            memory
          </h1>
          {window.innerWidth < 768 ? (
            <div className="bg-yellow rounded-[26px]">
              <h1
                className="text-[16px] pt-2 pb-2 pl-4 pr-4 text-white"
                onClick={showMenu}
              >
                Menu
              </h1>
            </div>
          ) : (
            <div className="flex gap-[16px]  ">
              <div
                onClick={refresh}
                className="bg-yellow rounded-[36px] lg:hover:bg-hoverYellow"
              >
                <h1 className="text-[26px] text-white text-center pl-10 pr-10 pt-4 pb-4">
                  Restart
                </h1>
              </div>
              <Link to={{ pathname: "/" }}>
                <div className="bg-gray rounded-[36px] lg:hover:bg-hoverBlue">
                  <h1 className="text-[26px] text-background text-center pl-10 pr-10 pt-4 pb-4">
                    New Game
                  </h1>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div
          className={`mt-[85px] md:mt-[157px] flex gap-x-3 md:gap-x-5  flex-wrap lg:mt-[105px]
        ${
          location.state.settings.size === 4
            ? "gap-x-3 md:gap-x-5 md:mt-[157px] md:ml-[10%] md:mr-[10%] lg:ml-[25%] lg:mr-[15%]"
            : "gap-x-[9px] md:gap-x-[16px] md:mt-[121px] md:ml-[8%] md:mr-[8%] lg:ml-[25%] lg:mr-[15%]"
        }`}
        >
          {generateTable()}
        </div>
        <div className="flex gap-6 mt-[100px] justify-center md:gap-[50px] ">
          <div className="bg-gray pr-[35px] pl-[35px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center md:rounded-[10px] md:gap-[105px] md:flex md:justify-between md:pr-[25px] md:pl-[25px]">
            <h1 className="text-tGray  text-[15px] md:text-[18px]">Time</h1>
            <h1 className="text-center text-background md:text-[32px]">{`${minutes}:${seconds
              .toString()
              .padStart(2, "0")}`}</h1>
          </div>
          <div className="bg-gray pr-[35px] pl-[35px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center md:rounded-[10px] md:gap-[105px] md:flex md:justify-between">
            <h1 className="text-tGray text-[15px] md:text-[18px]">Moves</h1>
            <h1 className="text-center text-background md:text-[32px]">
              {userChosenNumbers.length}
            </h1>
          </div>
        </div>
        {gameEnded && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white fixed top-0  flex flex-col  mt-[146px] pt-[32px] pb-[24px] pl-[24px] pr-[24px] rounded-lg md:ml-[50px] md:rounded-[20px] md:mr-[50px] md:pt-[51px] md:pr-[8%] md:pl-[8%]  md:mt-[257px]">
              <h1 className="text-2xl font-bold text-background text-center md:text-[48px]">
                You did it!
              </h1>
              <p className="text-center text-[14px] text-tGray md:mt-[20px] md:text-[18px]">
                Game over! Here’s how you got on…
              </p>
              <div className="mt-[24px] flex flex-row justify-between bg-gray rounded-lg p-[14px] md:gap-[300px]">
                <p className="text-[13px] text-center text-tGray p-0 md:self-center md:text-[18px] ">
                  Time Elapsed
                </p>
                <p className="text-background md:text-[32px]">{`${minutes}:${seconds
                  .toString()
                  .padStart(2, "0")}`}</p>
              </div>
              <div className="mt-2 flex flex-row justify-between bg-gray rounded-lg p-[14px] md:mt-4">
                <p className="text-[13px] text-center text-tGray p-0 md:self-center md:text-[18px]">
                  Moves Taken
                </p>
                <p className="text-background md:text-[32px]">
                  {userChosenNumbers.length} Moves
                </p>
              </div>
              <div className="md:flex md:justify-center md:w-full md:mt-10 md:gap-[14px] md:mb-[70px]">
                <div
                  className="bg-yellow rounded-[26px] mt-[24px] pt-3 pb-3 md:pl-[100px] md:pr-[100px] md:mt-0 "
                  onClick={refresh}
                >
                  <p className="text-center text-white md:text-[20px]">
                    Restart
                  </p>
                </div>
                <Link to={{ pathname: "/" }}>
                  <div className="bg-gray rounded-[26px] mt-[16px] pt-3 pb-3 md:pl-[42px] md:pr-[42px] md:mt-0">
                    <p className="text-center text-background md:text-[20px]">
                      Setup New Game
                    </p>
                  </div>
                </Link>
              </div>
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
