import React, { useContext, useEffect, useState } from "react";

import pcOn from "../assets/pc-on.gif";
import pcOff from "../assets/pc-off.png";

import axios from "axios";
import { Store } from "../management/Store";

const Server = (props: { status: boolean; usage: number; id: number }) => {
    const [intervalId, setIntervalId] = useState(0);

    const fetchUsage = () => {
        axios.get(`http://localhost:8000/status/${props.id}`).then((res) => {
            // function may tick later than setUsage(0) since its a promise
            if (props.status)
                dispatch({
                    type: "set-usage",
                    payload: {
                        id: props.id,
                        usage: res.data.load,
                    },
                });

            console.log(`updating ${props.id} with ${res.data.load}`);
        });
    };

    useEffect(() => {
        if (props.status) {
            setIntervalId(setInterval(fetchUsage, 5000));
        } else {
            clearInterval(intervalId);
            dispatch({
                type: "set-usage",
                payload: {
                    id: props.id,
                    usage: 0,
                },
            });
        }
    }, [props.status]);

    const { state, dispatch } = useContext(Store);

    return (
        <div
            className="window"
            style={{ minWidth: "320px", maxWidth: "400px", flex: "1 1" }}
        >
            <div className="title-bar" style={{ flex: "true" }}>
                <div className="title-bar-text">Server #{props.id}</div>
            </div>
            <div>
                <img
                    src={props.status ? pcOn : pcOff}
                    width={200}
                    height={150}
                />
            </div>
            <div className="status-bar" style={{ display: "flex" }}>
                <div
                    className="status-bar-field center"
                    style={{ flexBasis: "33%" }}
                >
                    Status: {`${props.status}`}
                </div>
                <button
                    className="status-bar-field"
                    style={{
                        cursor: "default",
                        color: "blue",
                        flexBasis: "33%",
                    }}
                    onClick={() =>
                        dispatch({
                            type: "set-status",
                            payload: { id: props.id, status: !props.status },
                        })
                    }
                >
                    {props.status ? "shut down" : "turn on"}
                </button>
                <div
                    className={
                        "status-bar-field center " +
                        (props.usage > 85 ? "text-red" : "")
                    }
                    style={{
                        flexBasis: "33%",
                    }}
                >
                    CPU Usage: {props.usage}%
                </div>
            </div>
        </div>
    );
};

export default Server;
