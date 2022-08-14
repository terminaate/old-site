import React from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '@/components/AnimatedSymbolsText/AnimatedSymbolsText'
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
				{/*<div className={cl.socials}>*/}
				{/*	<button onClick={() => open('//github.com/terminaate')}>*/}
				{/*		<img src={githubImg} alt='' />*/}
				{/*	</button>*/}
				{/*	<button>*/}
				{/*		<img src={discordImg} alt='' />*/}
				{/*	</button>*/}
				{/*</div>*/}
			</div>
		</>
	);
};

export default MainScreen;