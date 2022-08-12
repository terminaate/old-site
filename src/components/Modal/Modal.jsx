import React, { useEffect, useState } from 'react';
import cl from './Modal.module.css';

const Modal = ({ modal, setModal, children }) => {
	const [localModal, setLocalModal] = useState(modal);

	useEffect(() => {
		setLocalModal(modal);
	}, [modal]);

	const closeModal = () => {
		setLocalModal(false);
		setTimeout(() => setModal(false), 400);
	};

	return (
		<>
			{modal && (
				<div data-modal={localModal} onClick={closeModal} className={cl.modalScreen}>
					<div onClick={e => e.stopPropagation()} className={cl.modalContent}>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;