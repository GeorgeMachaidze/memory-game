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
  const [players, setPlayers] = useState(location.state.settings.players);
  const [playerTurn, setPlayerTurn] = useState(
    location.state.settings.players[0]
  );
  const lastElement = userChosenNumbers[userChosenNumbers.length - 1];
  const [playerIndex, setPlayerIndex] = useState(0);

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
      console.log(playerIndex);
      if (playerIndex === location.state.settings.players.length - 1) {
        setPlayerIndex(0);
        setPlayerTurn(location.state.settings.players[0]);
      } else {
        setPlayerIndex((prevIndex) => prevIndex + 1);
        setPlayerTurn(location.state.settings.players[playerIndex]);
      }
      setIsCircleClickable((prevClickable) => {
        const updatedClickable = [...prevClickable];
        updatedClickable[prevClickedCircle] = true;
        return updatedClickable;
      });
    } else {
      console.log(playerIndex);
      players[playerIndex].score++;
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
              location.state.settings.size === 4 ? "w-[74px] " : "w-[46px]"
            } ${location.state.settings.size === 4 ? "h-[74px]" : "h-[46px]"}
            ${location.state.settings.size === 4 ? "h-[74px]" : "h-[46px]"}
            
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
                  ? "text-[40px]"
                  : "text-[24px]"
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
        <div
          className={`mt-[85px] flex  gap-x-3 flex-wrap 
        ${location.state.settings.size === 4 ? "gap-x-3" : "gap-x-[9px]"}`}
        >
          {generateTable()}
        </div>
        <div className="flex gap-[23px] justify-center">
          {players.map((par) => {
            return (
              <div
                key={par.id}
                className="flex gap-6 mt-[100px] justify-center"
              >
                <div className="bg-gray pr-[20px] pl-[20px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center">
                  <h1 className="text-tGray text-[15px]">P{par.id + 1}</h1>
                  <h1 className="text-center text-background text-[24px]">
                    {par.score}
                  </h1>
                </div>
              </div>
            );
          })}
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
                <p className="text-background">{`${minutes}:${seconds
                  .toString()
                  .padStart(2, "0")}`}</p>
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