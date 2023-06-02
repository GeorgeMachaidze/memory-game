import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";

import shepherd from "../public/icons/australian-shepherd.png";
import beagle from "../public/icons/beagle.png";
import bullTerrier from "../public/icons/bull-terrier.png";
import bulldog from "../public/icons/bulldog.png";
import chihuahua from "../public/icons/chihuahua.png";
import corgi from "../public/icons/corgi.png";
import dachshund from "../public/icons/dachshund.png";
import dalmatian from "../public/icons/dalmatian.png";
import frenchBulldog from "../public/icons/french-bulldog.png";
import greatDane from "../public/icons/great-dane.png";
import jackRussellTerrier from "../public/icons/jack-russell-terrier.png";
import labradorRetriever from "../public/icons/labrador-retriever.png";
import pitbull from "../public/icons/pitbull.png";
import rottweiler from "../public/icons/rottweiler.png";
import sharPei from "../public/icons/shar-pei.png";
import shibaInu from "../public/icons/shiba-inu.png";
import siberianhusky from "../public/icons/siberian-husky.png";
import yorkshireTerrier from "../public/icons/yorkshire-terrier.png";

function GameIcons() {
  const location = useLocation();
  const iconArray = [
    shepherd,
    beagle,
    bullTerrier,
    bulldog,
    chihuahua,
    corgi,
    dachshund,
    dalmatian,
    frenchBulldog,
    greatDane,
    jackRussellTerrier,
    labradorRetriever,
    pitbull,
    rottweiler,
    sharPei,
    shibaInu,
    siberianhusky,
    yorkshireTerrier,
  ];
  const [clickedCircle, setClickedCircle] = useState(null);
  const [icons, setIcons] = useState(iconArray);
  const [numbers, setNumbers] = useState([]);
  const [userChosenIcons, setUserChosenIcons] = useState([]);
  const [flippedIcons, setFlippedIcons] = useState([]);
  const [prevClickedCircle, setPrevClickedCircle] = useState(null);
  const [isCircleClickable, setIsCircleClickable] = useState([]);
  const [matchedIcons, setMatchedIcons] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [myInterval, setMyInterval] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [menu, setMenu] = useState(false);
  const lastElement = userChosenIcons[userChosenIcons.length - 1];
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
    const icon = icons[numbers[index]];

    if (flippedIcons.includes(index) || matchedIcons.includes(icon)) {
      return;
    }

    // Show only the clicked circle
    const newFlippedIcons = [...flippedIcons];
    newFlippedIcons.push(index);
    setFlippedIcons(newFlippedIcons);

    // Check for a match
    if (clickedCircle === null) {
      // First icon clicked
      setClickedCircle(index);
    } else {
      // Second icon clicked
      const prevIcon = icons[numbers[clickedCircle]];

      if (prevIcon === icon) {
        // Match found
        setMatchedIcons((prevMatchedIcons) => [...prevMatchedIcons, prevIcon]);
      } else {
        // No match
        setTimeout(() => {
          // Hide the icons after a delay
          setFlippedIcons([]);
        }, 1000);
      }

      // Reset the clicked circle state
      setClickedCircle(null);
    }
  }
  const pushToArray = (icon) => {
    setUserChosenIcons((prevArray) => [...prevArray, icon]);
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

    const circles = [];

    for (let j = 0; j < numbers.length; j++) {
      const iconIndex = Math.floor(j / 2);
      const icon = icons[iconIndex];
      const isFlipped = flippedIcons.includes(j);
      const isMatched = matchedIcons.includes(icon);

      circles.push(
        <div
          key={j}
          className={`bg-background ${
            location.state.settings.size === 4 ? "w-[74px] " : "w-[46px]"
          } ${
            location.state.settings.size === 4 ? "h-[74px]" : "h-[46px]"
          } rounded-full flex items-center justify-center text-white text-40px`}
          onClick={() => show(j)}
        >
          {(flippedIcons.includes(j) ||
            matchedIcons.includes(icons[numbers[j]])) && (
            <img
              src={iconArray[numbers[j]]}
              alt="icon"
              className={`${
                location.state.settings.size === 4
                  ? "w-[40px] h-[40px]"
                  : "w-[24px] h-[24px]"
              }`}
            />
          )}
        </div>
      );
    }

    table.push(circles);

    return table;
  }

  useEffect(() => {
    if (matchedIcons.length === icons.length / 2 && icons.length / 2 > 0) {
      stopTimer(myInterval);
      setGameEnded(true);
    }

    return () => {
      stopTimer(interval);
    };
  }, [matchedIcons, icons.length]);

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
        <div className="flex gap-6 mt-[100px] justify-center">
          <div className="bg-gray pr-[35px] pl-[35px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center">
            <h1 className="text-tGray  text-[15px]">Time</h1>
            <h1 className="text-center">{`${minutes}:${seconds
              .toString()
              .padStart(2, "0")}`}</h1>
          </div>
          <div className="bg-gray pr-[35px] pl-[35px] pt-[10px] pb-[10px] rounded-[5px] justify-center items-center">
            <h1 className="text-tGray text-[15px]">Moves</h1>
            <h1 className="text-center">{userChosenIcons.length}</h1>
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
export default GameIcons;
