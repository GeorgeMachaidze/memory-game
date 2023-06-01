import { useState } from "react";
import { Form, Link } from "react-router-dom";
import "./App.css";
import { data } from "autoprefixer";

function Start() {
  const [settings, setSettings] = useState({
    theme: "Numbers",
    players: 1,
    size: 4,
  });
  const gamePagePath = settings.theme === "Icons" ? "/GameIcons" : "/game";
  const handleThemeChange = (newTheme) => {
    setSettings((prevState) => ({
      ...prevState,
      theme: newTheme,
    }));
  };
  const handlePlayersChange = (newPlayer) => {
    setSettings((prevState) => ({
      ...prevState,
      players: newPlayer,
    }));
  };
  const handleSizeChange = (newSize) => {
    setSettings((prevState) => ({
      ...prevState,
      size: newSize,
    }));
  };

  return (
    <>
      <div className="main min-h-screen bg-background">
        <h1 className="text-center text-[32px] font-bold text-white pt-20">
          memory
        </h1>

        <div className="mt-12 ml-6 mr-6 bg-white rounded-[10px] font-bold pb-6">
          <h1 className="text-tGray pl-6 pt-6 text-[15px] font-bold">
            Select Theme
          </h1>

          <div className="flex align-center justify-center m-6 mt-4 gap-3">
            <div
              className={`rounded-[26px] w-[50%] ${
                settings.theme === "Numbers" ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handleThemeChange("Numbers")}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px]">
                Numbers
              </h1>
            </div>
            <div
              className={`rounded-[26px] w-[50%] ${
                settings.theme === "Icons" ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handleThemeChange("Icons")}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px]">
                Icons
              </h1>
            </div>
          </div>

          <h1 className="text-tGray pl-6 text-[15px] font-bold">
            Numbers of Players
          </h1>

          <div className="flex align-center justify-center m-6 mt-4 gap-2">
            <div
              className={`rounded-[26px]  w-[25%] ${
                settings.players === 1 ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handlePlayersChange(1)}
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px]">
                1
              </h1>
            </div>
            <div
              className={`rounded-[26px]  w-[25%] ${
                settings.players === 2 ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handlePlayersChange(2)}
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px]">
                2
              </h1>
            </div>
            <div
              className={`rounded-[26px]  w-[25%] ${
                settings.players === 3 ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handlePlayersChange(3)}
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px]">
                3
              </h1>
            </div>
            <div
              className={`rounded-[26px]  w-[25%] ${
                settings.players === 4 ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handlePlayersChange(4)}
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px]">
                4
              </h1>
            </div>
          </div>

          <h1 className="text-tGray pl-6 text-[15px] font-bold">Grid Size</h1>

          <div className="flex align-center justify-center m-6 mt-4 gap-3">
            <div
              className={`rounded-[26px] w-[50%] ${
                settings.size === 4 ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handleSizeChange(4)}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px]">
                4x4
              </h1>
            </div>
            <div
              className={`rounded-[26px] w-[50%] ${
                settings.size === 6 ? "bg-background" : "bg-gray"
              }`}
              onClick={() => handleSizeChange(6)}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px]">
                6x6
              </h1>
            </div>
          </div>

          <Link to={{ pathname: gamePagePath }} state={{ settings }}>
            <div className="min-w-screen bg-yellow rounded-[26px] ml-6 mr-6">
              <h1 className="text-center pt-2 pb-2 text-white">Start Game</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Start;
