import React, { useState } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '../../components/AnimatedSymbolsText/AnimatedSymbolsText';
import MovableModal from '../../components/MovableModal/MovableModal';


const MainScreen = () => {
	const [modal, setModal] = useState(true);

	return (
		<div onClick={() => setModal(true)} className={cl.mainScreen}>
			<AnimatedSymbolsText className={cl.logo} infinite={true}>
				Terminaate
			</AnimatedSymbolsText>
			<MovableModal modal={modal}>
				Hello world
			</MovableModal>
		</div>
	);
};

export default MainScreen;