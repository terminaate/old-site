import React, { FC, ReactNode, useEffect, useState } from 'react';
import cl from './Modal.module.css';

interface IModal {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode
}

const Modal: FC<IModal> = ({ modal, setModal, children }) => {
	const [localModal, setLocalModal] = useState<typeof modal>(modal);

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