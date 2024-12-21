import { useState, useEffect } from "react";
import axios from "axios";
import { symbol, keypic, settings, info, crown, bell, user } from "./assets/Index";
function Results() {

    return (
        <div className="flex flex-col items-center h-screen justify-between px-[7rem] py-10 bg-main_bg">
            <div className="flex flex-row justify-between w-full items-center">
                <div className="w-1/3">
                    <div className="flex items-baseline justify-evenly">
                        <img src={symbol} alt="gerhe" className="w-10 cursor-pointer" />
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
        </div>
    )

};

export default Results;