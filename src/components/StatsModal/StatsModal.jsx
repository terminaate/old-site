import React from 'react';
import MovableModal from '../MovableModal/MovableModal';
import cl from "./StatsModal.module.css"

const StatsModal = ({modal, setModal}) => {
	return (
		<MovableModal minWidth={"400px"} className={cl.statsModal} title={"Stats"} width={"27%"} height={"75%"}  modal={modal} setModal={setModal}>
			MY STATS MODAL
		</MovableModal>
	);
};

export default StatsModal;