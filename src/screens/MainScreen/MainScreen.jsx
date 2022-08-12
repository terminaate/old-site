import React, { useState } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '../../components/AnimatedSymbolsText/AnimatedSymbolsText';
import githubImg from '../../assets/img/github.svg';
import discordImg from '../../assets/img/discord.svg';
import Particles from '../../components/Particles/Particles';
import MovableModal from '../../components/MovableModal/MovableModal';

const MainScreen = () => {
	const [modal, setModal] = useState('not-exist');
	const [modal2, setModal2] = useState('inactive');

	return (
		<>
			{/*<Header  />*/}
			<div onClick={() => setModal('active')} className={cl.mainScreen}>
				<Particles height={120} className={cl.logoParticles} />
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
				<MovableModal modal={modal} setModal={setModal}>
					Hello world
				</MovableModal>
				<MovableModal modal={modal2} setModal={setModal2}>
					Hello world2
				</MovableModal>
			</div>
		</>
	);
};

export default MainScreen;