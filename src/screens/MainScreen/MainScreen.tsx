import React, { FC } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '@/components/AnimatedSymbolsText';
import Particles from '@/components/Particles';
import Header from '@/components/Header';

const MainScreen: FC = () => {
	return (
		<>
			<Header />
			<div className={cl.mainScreen}>
				<Particles particlesCount={40} height={200} width={'100%'} className={cl.logoParticles} />
				<AnimatedSymbolsText className={cl.logo} infinite={true}>
					Terminaate
				</AnimatedSymbolsText>
			</div>
		</>
	);
};

export default MainScreen;