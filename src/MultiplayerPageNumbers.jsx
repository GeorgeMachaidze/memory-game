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
  const sortedPlayers = players.slice().sort((a, b) => b.score - a.score);
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

    pushToArray(number);

    if (number !== lastElement) {
      if (userChosenNumbers.length % 2 === 1) {
        if (playerIndex === location.state.settings.players.length - 1) {
          setPlayerIndex(0);
          setPlayerTurn(location.state.settings.players[0]);
        } else {
          setPlayerIndex((prevIndex) => prevIndex + 1);
          setPlayerTurn(location.state.settings.players[playerIndex]);
        }
        setTimeout(() => {
          setClickedCircle(null);
          setUserChosenNumbers([]);
        }, 1000);
      }
      setIsCircleClickable((prevClickable) => {
        const updatedClickable = [...prevClickable];
        updatedClickable[prevClickedCircle] = true;
        return updatedClickable;
      });
    } else {
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
          <button
            key={circleIndex}
            disabled={
              matchedNumbers.includes(number) || clickedCircle === circleIndex
            }
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
          </button>
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
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] md:text-[40px] text-background">memory</h1>
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
          className={`mt-[85px] flex md:mt-[157px] gap-x-3 flex-wrap lg:mt-[105px]
        ${
          location.state.settings.size === 4
            ? "gap-x-3 md:gap-x-5 md:mt-[157px] md:ml-[10%] md:mr-[10%] lg:ml-[25%] lg:mr-[15%]"
            : "gap-x-[9px] md:gap-x-[16px] md:mt-[121px] md:ml-[8%] md:mr-[8%] lg:ml-[25%] lg:mr-[15%]"
        }`}
        >
          {generateTable()}
        </div>
        <div className="flex gap-[23px] justify-center">
          {players.map((par) => {
            return (
              <div
                key={par.id}
                className={"flex gap-6 mt-[100px] justify-center "}
              >
                <div
                  className={`bg-gray pr-[20px] pl-[20px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center md:items-start md:flex  md:flex-col md:pr-0 ${
                    playerIndex === par.id ? "bg-yellow" : ""
                  }`}
                >
                  {window.innerWidth < 768 ? (
                    <h1 className="text-tGray text-[15px]">P{par.id + 1}</h1>
                  ) : (
                    <h1 className="text-tGray text-[15px] md:mr-[75px]">
                      Player {par.id + 1}
                    </h1>
                  )}
                  <h1 className="text-center text-background text-[24px] md:text-left">
                    {par.score}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        {gameEnded && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white fixed top-0  flex flex-col  mt-[146px] pt-[32px] pb-[24px] pl-[24px] pr-[24px] rounded-lg md:ml-[50px] md:rounded-[20px] md:mr-[50px] md:pt-[51px] md:pr-[8%] md:pl-[8%]  md:mt-[161px]">
              <h1 className="text-2xl font-bold text-background text-center md:text-[48px] ">
                {sortedPlayers[0].score === sortedPlayers[1].score
                  ? "It's a Tie!"
                  : "Player " + (sortedPlayers[0].id + 1) + " Winner "}
              </h1>
              <p className="text-center text-[14px] text-tGray md:mt-[20px] md:mb-[40px] md:text-[18px]">
                Game over! Here are the results…
              </p>
              {sortedPlayers.map((player, index) => {
                let highestScore = sortedPlayers[0].score;

                let textColor =
                  player.score === highestScore
                    ? "text-white"
                    : "text-[13px] text-center text-tGray";
                let bgColor =
                  player.score === highestScore ? "bg-background" : "bg-gray";

                let winnerLabel =
                  player.score === highestScore ? "(Winner)" : "";

                return (
                  <div key={player.id}>
                    <div
                      className={`mt-2 flex flex-row justify-between rounded-lg p-[14px]  ${bgColor}`}
                    >
                      <p
                        className={`text-[13px] text-center p-0 md:text-[18px] md:self-center ${textColor}`}
                      >
                        Player {sortedPlayers[index].id + 1} {winnerLabel}
                      </p>
                      <p className={`${textColor} md:text-[32px]`}>
                        {sortedPlayers[index].score} Pairs
                      </p>
                    </div>
                  </div>
                );
              })}

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
