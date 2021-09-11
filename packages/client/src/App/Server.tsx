import React, { useEffect, useState } from "react";

import pcOn from "../assets/pc-on.gif";
import pcOff from "../assets/pc-off.png";

import axios from "axios";

const Server = (props: { index: number }) => {
    const [status, setStatus] = useState(false);
    const [usage, setUsage] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    const fetchUsage = () => {
        axios.get(`http://localhost:8000/status/${props.index}`).then((res) => {
            setUsage(res.data.load);

            console.log(`updating ${props.index} with ${res.data.load}`);
        });
    };

    useEffect(() => {
        if (status) {
            setIntervalId(setInterval(fetchUsage, 5000));
        } else {
            clearInterval(intervalId);
            setUsage(0);
        }
    }, [status]);

    const toggleStatus = () => {
        setStatus((oldStatus) => !oldStatus);
    };

    return (
        <div
            className="window"
            style={{ minWidth: "320px", maxWidth: "400px", flex: "1 1" }}
        >
            <div className="title-bar" style={{ flex: "true" }}>
                <div className="title-bar-text">Server #{props.index}</div>
            </div>
            <div>
                <img src={status ? pcOn : pcOff} width={200} height={150} />
            </div>
            <div className="status-bar" style={{ display: "flex" }}>
                <div className="status-bar-field" style={{ flexBasis: "33%" }}>
                    Status: {`${status}`}
                </div>
                <div
                    className="status-bar-field"
                    style={{
                        cursor: "default",
                        color: "blue",
                        flexBasis: "33%",
                    }}
                    onClick={() => toggleStatus()}
                >
                    {status ? "shut down" : "turn on"}
                </div>
                <div className="status-bar-field" style={{ flexBasis: "33%" }}>
                    CPU Usage: {usage}%
                </div>
            </div>
        </div>
    );
};

export default Server;
