import React, { FC, useState } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '@/components/AnimatedSymbolsText';
import Particles from '@/components/Particles';
import Header from '@/components/Header';
import MainScreenContext, { MainScreenContextProps } from '@/contexts/MainScreenContext';

const MainScreen: FC = () => {
	const [mainScreenContext, setMainScreenContext] = useState<MainScreenContextProps>({
		particlesConfig: {
			particlesCount: 25,
			height: 120,
			width: '100%'
		}
	});

	return (
		<MainScreenContext.Provider value={{ mainScreenContext, setMainScreenContext }}>
			<Header />
			<div className={cl.mainScreen}>
				<Particles {...mainScreenContext.particlesConfig} className={cl.logoParticles} />
				<AnimatedSymbolsText className={cl.logo} infinite={true}>
					Terminaate
				</AnimatedSymbolsText>
			</div>
		</MainScreenContext.Provider>
	);
};

export default MainScreen;