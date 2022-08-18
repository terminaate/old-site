import React, { FC, useState } from 'react';
import IntroScreen from '@/screens/IntroScreen';
import MainScreen from '@/screens/MainScreen';

const App: FC = () => {
	const [intro, setIntro] = useState<boolean>(true);

	return (
		<>
			{intro && <IntroScreen setIntro={setIntro} />}
			{!intro && <MainScreen />}
		</>
	);
};

export default App;