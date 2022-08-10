import React from 'react';
import TypingText from '../../components/TypingText/TypingText';
import cl from "./MainScreen.module.css";
import AnimatedSymbolsText from '../../components/AnimatedSymbolsText/AnimatedSymbolsText';

const MainScreen = ({ isIntroEnded }) => {

	return (
		<div className={cl.mainScreen}>
			<AnimatedSymbolsText className={cl.logo} infinite={true}>
				Terminaate
			</AnimatedSymbolsText>
		</div>
	);
};

export default MainScreen;