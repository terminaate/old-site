import React, { useState } from 'react';
import cl from './MovableModal.module.css';

const MovableModal = ({ modal, setModal, children }) => {
	const [cords, setCords] = useState({ x: 0, y: 0 });

	const onMouseDown = () => {
		const dragHandler = (e) => {
			setCords({ x: e.clientX, y: e.clientY });
		};

		addEventListener('mousemove', dragHandler);

		addEventListener('mouseup', function() {
			removeEventListener('mousemove', dragHandler);
			removeEventListener('mouseup', this);
		});

	};

	return (
		<>
			{modal && (
				<div onMouseDown={onMouseDown} style={{ top: cords.y, left: cords.x }} className={cl.modalContent}>
					{children}
				</div>
			)}
		</>
	);
};

export default MovableModal;