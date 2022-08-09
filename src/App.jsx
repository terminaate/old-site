import React from 'react';
import IntroScreen from "./screens/IntroScreen/IntroScreen";
import MainScreen from "./screens/MainScreen/MainScreen";

const App = () => {
    return (
        <div className={"App"}>
            <IntroScreen/>
            <MainScreen/>
        </div>
    );
};

export default App;