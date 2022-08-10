import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen/IntroScreen';
import MainScreen from './screens/MainScreen/MainScreen';

const App = () => {
	const [isIntroEnded, setIsIntroEnded] = useState(false);

	return (
		<>
			{!isIntroEnded && <IntroScreen setIsIntroEnded={setIsIntroEnded} />}
			{isIntroEnded && <MainScreen />}
		</>
	);
};

export default App;