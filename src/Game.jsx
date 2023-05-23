import { useLocation } from "react-router-dom";

function Game() {
  const location = useLocation();
 




  function generateTable() {
    const table = [];

   
    for (let i = 0; i < location.state.settings.size; i++) {
      const circles = [];

      for (let j = 0; j < location.state.settings.size; j++) {
       

        circles.push(
          <div
            key={j}
            className="bg-background w-[72.53px] h-[72.53px] mt-3 rounded-full flex items-center justify-center"
          >
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