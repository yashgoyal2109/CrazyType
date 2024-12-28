import { useState, useEffect } from "react";
import axios from "axios";
import { symbol, keypic, settings, info, crown, bell, user } from "./assets/Index";
import { useNavigate } from "react-router-dom";

function App() {
  const [word, setWord] = useState("hi my name is yash goyal");
  const [inputValue, setInputValue] = useState("");
  const [caret, changeCaret] = useState(0);
  const [letterStatus, setLetterStatus] = useState([]);
  const [greencount, setgreenCount] = useState(0);
  const [redcount, setredCount] = useState(0);
  const [wordcount, setwordCount] = useState(0);
  const [notfinish, setnotFinish] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [count, setCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (caret === word.length) {
      setnotFinish(false);

      // Calculate WPM and Accuracy
      const endTime = Date.now();
      const timeTakenInMinutes = (endTime - startTime) / 60000; // Convert milliseconds to minutes
      const calculatedWpm = (greencount / 5) / timeTakenInMinutes; // Assuming 5 chars per word
      const calculatedAccuracy =
        inputValue.length > 0 ? (greencount / inputValue.length) * 100 : 100;

      setWpm(calculatedWpm.toFixed(2));
      setAccuracy(calculatedAccuracy.toFixed(2));
    } else {
      setnotFinish(true);
    }
  }, [caret, word.length, greencount, inputValue.length, startTime]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        return;
      }

      if (!startTime) {
        setStartTime(Date.now());
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        if (inputValue.length > 0) {
          setInputValue((prev) => prev.slice(0, -1));
          changeCaret((prev) => Math.max(0, prev - 1));
        }
      } else if (e.key.length === 1 && inputValue.length < word.length) {
        e.preventDefault();
        setInputValue((prev) => prev + e.key);
        changeCaret((prev) => Math.min(word.length, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [word.length, inputValue.length, startTime]);

  useEffect(() => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        setWord(response.data.value);
      })
      .catch((error) => console.error(error));
  }, [count]);

  useEffect(() => {
    const spellCheck = () => {
      let greenCountTemp = 0;
      let redCountTemp = 0;

      const updatedStatus = word.split("").map((letter, index) => {
        if (inputValue[index] === undefined) {
          return "text-text_color";
        } else if (inputValue[index] === letter) {
          greenCountTemp++;
          return "text-green-500";
        } else {
          redCountTemp++;
          return "text-red-500";
        }
      });

      setLetterStatus(updatedStatus);
      setgreenCount(greenCountTemp);
      setredCount(redCountTemp);
    };

    spellCheck();
  }, [inputValue, word]);

  const callApi = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-between px-[7rem] py-10 bg-main_bg">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="w-1/3">
          <div className="flex items-baseline justify-evenly">
            <img src={symbol} alt="logo" className="w-10 cursor-pointer" />
            <p className="text-2xl font-bold cursor-pointer text-heading_color">CrazyType</p>
            <img src={keypic} alt="" className="image-small cursor-pointer" onClick={callApi} />
            <img src={crown} alt="" className="image-small cursor-pointer" />
            <img src={info} alt="" className="image-small cursor-pointer" />
            <img src={settings} alt="" className="image-small cursor-pointer" />
          </div>
        </div>
        <div className="w-1/6">
          <div className="flex items-center justify-evenly">
            <img src={bell} alt="" className="image-small cursor-pointer" />
            <img src={user} alt="" className="image-small cursor-pointer" />
            <p className="text-l cursor-pointer text-text_color">Lucifer</p>
          </div>
        </div>
      </div>

      {notfinish ? (
        <div>
          <div className="p-8 font-mono">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="sr-only"
              autoFocus
            />
            <div className="relative inline-block text-xl leading-relaxed whitespace-pre-wrap break-all">
              {word.split("").map((letter, index) => (
                <span
                  key={index}
                  className={`${letterStatus[index]} relative inline-block`}
                >
                  {letter}
                  {index === caret && (
                    <span
                      className="absolute top-0 left-0 animate-pulse bg-yellow-500 w-0.5 h-7"
                      style={{
                        transform: "translateX(-50%)",
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">

          <div>
            nguerge
          </div>
            gerge

          <div>

          </div>
          <p>Correct Letters: {greencount}</p>
          <p>Word Count: {wordcount}</p>
          <p>Incorrect Letters: {redcount}</p>
          <p>Total Time: {(Date.now() - startTime) / 1000} seconds</p>
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
      )}

      <div>
        <p className="text-text_color">Type the text above</p>
      </div>
    </div>
  );
}

export default App;
