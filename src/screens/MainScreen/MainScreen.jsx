import React, { useState } from 'react';
import cl from './MainScreen.module.css';
import AnimatedSymbolsText from '../../components/AnimatedSymbolsText/AnimatedSymbolsText';
import Modal from '../../components/Modal/Modal';

const MainScreen = () => {
	const [modal, setModal] = useState(false);

	return (
		<div onClick={() => setModal(true)} className={cl.mainScreen}>
			<AnimatedSymbolsText className={cl.logo} infinite={true}>
				Terminaate
			</AnimatedSymbolsText>
			<Modal modal={modal} setModal={setModal}>
				Hello world
			</Modal>
		</div>
	);
};

export default MainScreen;