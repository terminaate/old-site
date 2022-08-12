import React from 'react';
import MovableModal from '../MovableModal/MovableModal';

const StatsModal = ({modal, setModal}) => {
	return (
		<MovableModal title={"Stats"}  modal={modal} setModal={setModal}>
			MY STATS MODAL
		</MovableModal>
	);
};

export default StatsModal;