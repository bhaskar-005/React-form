import { useState } from "react"
import Level1 from "./components/Level1"
import Level2 from "./components/Level2";
import { AiOutlineRise } from "react-icons/ai";
import Level3 from "./components/Level3";

function App() {
  const [level, setLevel] = useState<Number>(1)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md flex gap-5 mt-5">
        {[1, 2, 3].map((number) => (
          <button 
           key={number}
           onClick={()=>setLevel(number)}
           className={`${level == number ? 'bg-indigo-600':'bg-indigo-400'} flex sm: text-[13px] flex-row gap-2 items-center py-2 px-4 text-white font-semibold rounded-md hover:bg-indigo-500 `}>
            <AiOutlineRise className="sm:text-[19px] text-[13px]"/> Level {number}
          </button>
        ))}
      </div>
      {level == 1 && <Level1 />}
      {level == 2 && <Level2 />}
      {level == 3 && <Level3 />}
  </div>
  );
}

export default App
