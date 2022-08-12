import React, { useEffect, useRef, useState } from 'react';
import cl from './MovableModal.module.css';
import closeImg from '../../assets/img/down-arrow.png';

const MovableModal = ({ modal, setModal, children, title="MovableModal" }) => {
	const [cords, setCords] = useState({ x: 0, y: 0 });
	const [localModal, setLocalModal] = useState(modal);
	const modalRef = useRef(null);

	useEffect(() => {
		setLocalModal(modal);
	}, [modal]);

	useEffect(() => {
		const handler = (e) => {
			if (null === modalRef) return;

			if (!modalRef.current.contains(e.target)) {
				setModal('inactive');
			} else {
				setModal('active');
			}
		};

		addEventListener('click', handler);
		return () => removeEventListener('click', handler);
	}, []);

	const onMouseDown = () => {
		const dragHandler = ({movementX, movementY}) => {
			setCords({ x: movementX + parseInt(modalRef.current?.style.left), y: movementY + parseInt(modalRef.current?.style.top) });
		};

		addEventListener('mousemove', dragHandler);

		addEventListener('mouseup', function() {
			removeEventListener('mousemove', dragHandler);
			removeEventListener('mouseup', this);
		});
	};

	const closeModal = () => {
		setLocalModal('not-exist');
		setTimeout(() => setModal('not-exist'), 400);
	};

	return (
		<>
			{modal !== 'not-exist' && (
				<div ref={modalRef} onClick={e => e.stopPropagation()} style={{ top: cords.y, left: cords.x }}
						 data-modal={localModal}
						 className={cl.modalContainer}>
					<div onMouseDown={onMouseDown} className={cl.modalHeader}>
						<span className={cl.modalHeaderTitle}>{ title }</span>
						<div className={cl.modalHeaderButtons}>
							<button onClick={closeModal} className={cl.closeButton}>
								<img src={closeImg} alt='' />
							</button>
						</div>
					</div>
					<div className={cl.modalContent}>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default MovableModal;