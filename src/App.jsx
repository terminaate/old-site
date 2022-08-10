import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen/IntroScreen';
import MainScreen from './screens/MainScreen/MainScreen';

const App = () => {
	const [isIntroEnded, setIsIntroEnded] = useState(false);

	return (
		<>
			<IntroScreen setIsIntroEnded={setIsIntroEnded} />
			<MainScreen isIntroEnded={isIntroEnded} />
		</>
	);
};

export default App;