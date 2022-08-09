import React, {useEffect, useRef, useState} from 'react';
import cl from "./IntroScreen.module.css";
import TypingText from "../../components/TypingText/TypingText";
// import Particles from "../../components/Particles/Particles";

const IntroScreen = () => {
    const [backgroundState, setBackgroundState] = useState("loading");
    const visited = useRef(Boolean(localStorage.getItem("visited")));

    useEffect(() => {
        setBackgroundState("loaded")

        if (!localStorage.getItem("visited")) {
            localStorage.setItem("visited", "true")
        }
    }, [])

    return (
        <div className={cl.introScreen} data-background={backgroundState}>
            {/*<div className={cl.introScreenBackground}>*/}
            {/*    <Particles/>*/}
            {/*    HERE SOMETHING IN BACKGROUND*/}
            {/*</div>*/}
            <div className={cl.introScreenForeground}>
                <TypingText onClick={e => e.target.style.background = "none"}
                            className={visited.current ? cl.introTypingVisitedText : ""}
                            text={"A programmer is a person who writes code and compiles it himself into an executable file, so we are all \"script kiddy\", remember that bitches)"}/>
                <div onClick={() => backgroundState === "loaded" ? setBackgroundState("clicked") : ""}
                     className={cl.introSkipButton}>
                    <span>-</span>
                    <span>{visited.current ? "skip" : "shut up 14yo \"programmer\""}</span>
                </div>
            </div>
        </div>
    );
};

export default IntroScreen;