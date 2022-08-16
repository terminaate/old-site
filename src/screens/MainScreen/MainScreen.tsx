import React, { FC, useState } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '@/components/AnimatedSymbolsText/AnimatedSymbolsText';
import Particles from '@/components/Particles/Particles';
import Header from '@/components/Header/Header';
import MainScreenContext from '../../contexts/MainScreenContext';

const MainScreen: FC = () => {
	const [mainContext, setMainContext] = useState({
		particlesConfig: {
			count: 25,
			height: 120,
			width: '100%'
		}
	});

	return (
		<>
			<MainScreenContext.Provider value={[mainContext, setMainContext]}>
				<Header />
				<div className={cl.mainScreen}>
					<Particles particlesCount={mainContext.particlesConfig.count} width={mainContext.particlesConfig.width}
										 height={mainContext.particlesConfig.height}
										 className={cl.logoParticles} />
					<AnimatedSymbolsText className={cl.logo} infinite={true}>
						Terminaate
					</AnimatedSymbolsText>
				</div>
			</MainScreenContext.Provider>
		</>
	);
};

export default MainScreen;