import * as React from "react";
import { Store, StoreJSX } from "../management/Store";

import styles from "./App.module.scss";
import Server from "./Server";

const App: React.FC = () => {
    const { state, dispatch } = React.useContext(Store);

    return (
        <main
            className={styles.container}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div className={"window " + styles.windowContainer}>
                <div className="title-bar">
                    <div className="title-bar-text">Server Management</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className={styles.serversContainer}>
                    {state.servers.map((sv, index) => (
                        <Server
                            status={sv.status}
                            usage={sv.usage}
                            id={sv.id}
                            key={sv.id}
                        />
                    ))}
                </div>
                <div className={styles.controlsContainer}>
                    <button
                        disabled={
                            state.servers.filter((sv) => sv.status === true)
                                .length == 0
                        }
                        onClick={() => dispatch({ type: "shutdown-all" })}
                    >
                        Shut down all
                    </button>
                    <button
                        disabled={
                            state.servers.filter((sv) => sv.status === false)
                                .length < 1
                        }
                        onClick={() => dispatch({ type: "turn-on-all" })}
                    >
                        Turn on all
                    </button>
                </div>
                <div className={styles.subTitle}>
                    Visit the repo of this project{" "}
                    <a
                        href="https://github.com/andresmarpz/innovid-challenge"
                        target="_blank"
                    >
                        here
                    </a>
                    !
                </div>
            </div>
        </main>
    );
};

export default App;
