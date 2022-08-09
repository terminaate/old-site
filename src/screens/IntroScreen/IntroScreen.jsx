import React, {useEffect, useState} from 'react';
import cl from "./IntroScreen.module.css";
import TypingText from "../../components/TypingText/TypingText";
import Particles from "../../components/Particles/Particles";

const IntroScreen = () => {
    const [backgroundState, setBackgroundState] = useState("loading");

    useEffect(() => {
        document.body.onload = () => {
            setTimeout(() => setBackgroundState("loaded"), 1000)
        }
    }, [])

    return (
        <div onClick={() => setBackgroundState("clicked")} className={cl.introScreen} data-background={backgroundState}>
            <div className={cl.introScreenBackground}>
                <Particles/>
            </div>
            <div className={cl.introScreenContainer}>
                <TypingText text={["Hello", "mother", "fucking", "world", "world", "world", "world", "world", "world", "world", "world", "world", "world", "world", ]}/>
            </div>
        </div>
    );
};

export default IntroScreen;