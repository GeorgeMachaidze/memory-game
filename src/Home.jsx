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

  const gamePagePath =
    settings.players.length > 1 && settings.theme === "Numbers"
      ? "/MultiplayerPageNumbers"
      : settings.players.length > 1 && settings.theme === "Icons"
      ? "/MultiplayerPageIcons"
      : settings.theme === "Icons"
      ? "/GameIcons"
      : "/game";
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
      <div className="main min-h-screen bg-background md:pb-[160px]">
        <h1 className="text-center text-[32px] md:text-[40px] font-bold text-white pt-20 md:pt-[169px]">
          memory
        </h1>

        <div className="mt-12 ml-6 mr-6 bg-white rounded-[10px] font-bold pb-6 md:rounded-[20px] md:pb-[56px] md:pl-[56px] md:pr-[56px] md:mt-[78px] md:mr-[56px] md:ml-[56px] lg:ml-[393px] lg:mr-[393px]">
          <h1 className="text-tGray pl-6 pt-6  md:pt-[56px] text-[15px] md:text-[20px] md:pl-0 font-bold">
            Select Theme
          </h1>

          <div className="flex align-center justify-center m-6 mt-4 gap-3 md:mb-[33px] md:ml-0 md:gap-[30px]">
            <div
              className={`rounded-[26px]  w-[50%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.theme === "Numbers" ? "bg-background" : "bg-tGray"
              }`}
              onClick={() => handleThemeChange("Numbers")}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8  font-bold text-white text-[16px]  md:text-[26px]">
                Numbers
              </h1>
            </div>
            <div
              className={`rounded-[26px] w-[50%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.theme === "Icons" ? "bg-background" : "bg-tGray"
              }`}
              onClick={() => handleThemeChange("Icons")}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px] md:text-[26px]">
                Icons
              </h1>
            </div>
          </div>

          <h1 className="text-tGray pl-6  text-[15px] md:pl-0 md:text-[20px] font-bold">
            Numbers of Players
          </h1>

          <div className="flex align-center justify-center m-6 mt-4 gap-2 md:gap-[22px] md:ml-0 md:mb-[33px] ">
            <div
              className={`rounded-[26px]  w-[25%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.players === 1 ? "bg-background" : "bg-tGray"
              }`}
              onClick={() => handlePlayersChange(1)}
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px] md:text-[26px]">
                1
              </h1>
            </div>
            <div
              className={`rounded-[26px]  w-[25%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.players.length === 2 ? "bg-background" : "bg-tGray"
              }`}
              onClick={() =>
                handlePlayersChange([
                  { id: 0, score: 0 },
                  { id: 1, score: 0 },
                ])
              }
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px] md:text-[26px]">
                2
              </h1>
            </div>
            <div
              className={`rounded-[26px]  w-[25%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.players.length === 3 ? "bg-background" : "bg-tGray"
              }`}
              onClick={() =>
                handlePlayersChange([
                  { id: 0, score: 0 },
                  { id: 1, score: 0 },
                  { id: 2, score: 0 },
                ])
              }
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px] md:text-[26px]">
                3
              </h1>
            </div>
            <div
              className={`rounded-[26px]  w-[25%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.players.length === 4 ? "bg-background" : "bg-tGray"
              }`}
              onClick={() =>
                handlePlayersChange([
                  { id: 0, score: 0 },
                  { id: 1, score: 0 },
                  { id: 2, score: 0 },
                  { id: 3, score: 0 },
                ])
              }
            >
              <h1 className="text-center pt-3 pb-3 pl-7 pr-7 font-bold text-white text-[16px] md:text-[26px] ">
                4
              </h1>
            </div>
          </div>

          <h1 className="text-tGray pl-6  text-[15px] md:pl-0 md:text-[20px] font-bold">
            Grid Size
          </h1>

          <div className="flex align-center justify-center m-6 mt-4 gap-3 md:ml-0 md:gap-[30px] md:mb-[33px] ">
            <div
              className={`rounded-[26px] w-[50%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.size === 4 ? "bg-background" : "bg-tGray"
              }`}
              onClick={() => handleSizeChange(4)}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px] md:text-[26px] ">
                4x4
              </h1>
            </div>
            <div
              className={`rounded-[26px] w-[50%] md:rounded-[36px] lg:hover:bg-hoverBlue cursor-pointer ${
                settings.size === 6 ? "bg-background" : "bg-tGray"
              }`}
              onClick={() => handleSizeChange(6)}
            >
              <h1 className="text-center pt-3 pb-3 pl-8 pr-8 font-bold text-white text-[16px] md:text-[26px] ">
                6x6
              </h1>
            </div>
          </div>

          <Link to={{ pathname: gamePagePath }} state={{ settings }}>
            <div className="min-w-screen bg-yellow rounded-[26px] md:rounded-[35px] ml-6 mr-6 md:ml-0 lg:hover:bg-hoverYellow cursor-pointer">
              <h1 className="text-center pt-2 pb-2 md:text-[26px] md:pt-4 md:pb-4 text-white">
                Start Game
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Start;
