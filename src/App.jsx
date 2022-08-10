import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen/IntroScreen';
import MainScreen from './screens/MainScreen/MainScreen';

const App = () => {
	const [isIntroEnded, setIsIntroEnded] = useState(true);

	return (
		<>
			<IntroScreen isIntroEnded={isIntroEnded} setIsIntroEnded={setIsIntroEnded} />
			{isIntroEnded && <MainScreen isIntroEnded={isIntroEnded} />}
		</>
	);
};

export default App;