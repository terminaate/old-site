import React from 'react';
import TypingText from '../../components/TypingText/TypingText';

const MainScreen = ({ isIntroEnded }) => {

	return (
		<div>
			{ isIntroEnded && (
				<TypingText text={"THIS IS A FUCKING MAIN CONTENT"}/>
			)}
		</div>
	);
};

export default MainScreen;