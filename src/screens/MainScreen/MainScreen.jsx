import React from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '@/components/AnimatedSymbolsText/AnimatedSymbolsText';
import Particles from '@/components/Particles/Particles';
import Header from '@/components/Header/Header';

const MainScreen = () => {

	return (
		<>
			<Header />
			<div className={cl.mainScreen}>
				<Particles particlesCount={20} height={120} className={cl.logoParticles} />
				<AnimatedSymbolsText className={cl.logo} infinite={true}>
					Terminaate
				</AnimatedSymbolsText>
			</div>
		</>
	);
};

export default MainScreen;