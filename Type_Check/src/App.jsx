import { useState, useEffect } from "react";
import axios from "axios";
import { symbol, keypic, settings, info, crown, bell, user } from "./assets/Index";
import { Navigate, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Navbar from "./components/Navbar";
import Bottom from "./components/Bottom";

const apiurl = import.meta.env.VITE_API_URL;

function App() {

  const [performanceData, setPerformanceData] = useState([]);
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

  
  const submitResult = async () => {
    try {
      const resultData = {
        wpm: parseInt(wpm),
        accuracy: parseInt(accuracy),
        timeElapsed: parseInt(((Date.now() - startTime) / 1000).toFixed(0)),
      };
  
      const response = await axios.post(`${apiurl}/results`, resultData, {
        withCredentials: true
      });
      console.log("Result submitted:", response.data);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };


  useEffect(() => {
    if (caret === word.length) {
      setnotFinish(false);
      const endTime = Date.now();
      const timeTakenInMinutes = (endTime - startTime) / 60000;
      const calculatedWpm = (greencount / 6) / timeTakenInMinutes;
      const calculatedAccuracy =
        inputValue.length > 0 ? (greencount / inputValue.length) * 100 : 100;
      const errors = redcount;
      const rawWpm = (inputValue.length / 6) / timeTakenInMinutes;

      setWpm(calculatedWpm.toFixed(0));
      setAccuracy(calculatedAccuracy.toFixed(0));

      setPerformanceData(prevData => {
        const newDataPoint = {
          time: prevData.length + 1,
          wpm: parseInt(calculatedWpm.toFixed(0)),
          raw: parseInt(rawWpm.toFixed(0)),
          errors: errors
        };
        return [...prevData, newDataPoint];
      });
      submitResult();
    } else {
      setnotFinish(true);
    }
  }, [caret, word.length, greencount, inputValue.length, startTime, redcount]);

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



  const handleLogout = async () => {
    try {
      await axios.post(`${apiurl}/logout`, {}, { withCredentials: true });
      window.location.href = "/auth/login";
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-between px-[7rem] py-10 bg-main_bg">
      <Navbar callApi={callApi}/>

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

          <div className="flex justify-center items-center p-10">

            <div>
              <p className="text-text_color text-xl">WPM: </p>
              <p className="text-number_color text-4xl"> {wpm}</p>
              <p className="text-text_color text-xl">Accuracy: </p>
              <p className="text-number_color text-4xl">{accuracy}%</p>
            </div>
            <div>
              <LineChart
                width={730}
                height={250}
                data={performanceData}
                margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
              >
                <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -5 }} />
                <YAxis
                  yAxisId="left"
                  label={{ value: "Words per Minute", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "Errors", angle: -90, position: "insideRight" }}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="wpm"
                  stroke="#fadb14"
                  strokeWidth={2}
                  dot={false}
                  name="WPM"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="raw"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                  name="Raw"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="errors"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Errors"
                />
              </LineChart>
            </div>


          </div>
          <div className="flex justify-evenly items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-text_color text-xl">Correct Letters: </p>
              <p className="text-number_color text-xl">{greencount}</p>
            </div>


            <div className="flex flex-col items-center">
              <p className="text-text_color text-xl">Incorrect Letters: </p>
              <p className="text-number_color text-xl">{redcount}</p>
            </div>


            <div className="flex flex-col items-center">
              <p className="text-text_color text-xl">Total Time:  </p>
              <p className="text-number_color text-xl">{((Date.now() - startTime) / 1000).toFixed(0)} sec</p>
            </div>

          </div>


        </div>
      )}

      <div>
      <Bottom currentPhrase={word} />
      </div>
    </div>
  );
}

export default App;
