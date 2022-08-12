import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen/IntroScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import Header from './components/Header/Header';

const App = () => {
	const [intro, setIntro] = useState(true);

	return (
		<>
			{intro && <IntroScreen setIntro={setIntro} />}
			{!intro && <MainScreen />}
		</>
	);
};

export default App;