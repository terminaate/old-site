import React, {useEffect, useState} from 'react';
import cl from "./IntroScreen.module.css";
import TypingText from "../../components/TypingText/TypingText";

const IntroScreen = () => {
    const [backgroundState, setBackgroundState] = useState("loading");

    // useEffect(() => {
    //     document.body.onload = () => {
    //         setBackgroundState("loaded")
    //     }
    // }, [])

    return (
        <div onClick={() => setBackgroundState("clicked")} className={cl.introScreen} data-background={backgroundState}>
            <div className={cl.introScreenContainer}>
                <TypingText text={[...[...Array(300)].map((_, i) => String(i + 1)),  "Отсоси у тракториста"]} defaultDelay={100}/>
            </div>
        </div>
    );
};

export default IntroScreen;