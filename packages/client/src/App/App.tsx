import * as React from "react";

import styles from "./App.module.scss";
import Server from "./Server";

const App: React.FC = () => {
    const generateServers = (quantity: number) => {
        const servers: JSX.Element[] = [];
        for (let index = 0; index < quantity; index++) {
            servers.push(<Server index={index + 1} key={"s" + index} />);
        }

        return servers;
    };

    const servers = generateServers(4);

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
            <div className={styles.serversContainer}>{servers}</div>
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
        </main>
    );
};

export default App;
