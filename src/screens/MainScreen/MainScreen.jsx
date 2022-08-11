import React, { useState } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '../../components/AnimatedSymbolsText/AnimatedSymbolsText';
import githubImg from '../../assets/svg/github.svg';
import discordImg from '../../assets/svg/discord.svg';
import Particles from '../../components/Particles/Particles';

const MainScreen = () => {
	const [modal, setModal] = useState(true);

	return (
		<>
			<div onClick={() => setModal(true)} className={cl.mainScreen}>
				<Particles height={120} className={cl.logoParticles}/>
				<AnimatedSymbolsText className={cl.logo} infinite={true}>
					Terminaate
				</AnimatedSymbolsText>
				<div className={cl.socials}>
					<button onClick={() => open('//github.com/terminaate')}>
						<img src={githubImg} alt='' />
					</button>
					<button>
						<img src={discordImg} alt='' />
					</button>
				</div>
			</div>
		</>
	);
};

export default MainScreen;