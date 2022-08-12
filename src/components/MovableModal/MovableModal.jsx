import React, { useEffect, useRef, useState } from 'react';
import cl from './MovableModal.module.css';
import closeImg from '../../assets/img/down-arrow.png';
import collapseImg from '../../assets/img/down-arrow.png';
import fullScreenImg from '../../assets/img/down-arrow.png';

const MovableModal = ({
												modal,
												setModal,
												children,
												title = 'MovableModal',
												onClose = () => {
												},
												minWidth = '300px',
												minHeight = '150px'
											}) => {
	const [cords, setCords] = useState({ x: 0, y: 0 });
	const [localModal, setLocalModal] = useState(modal);
	const [transition, setTransition] = useState('.3s ease-in-out');
	const oldTransition = useRef(transition);
	const [sizes, setSizes] = useState({ width: minWidth, height: minHeight, fullscreen: false });
	const oldSizes = useRef(sizes);
	const oldCords = useRef(cords);
	let modalRef = useRef(null);

	useEffect(() => {
		setLocalModal(modal);
	}, [modal]);

	useEffect(() => {
		const handler = (e) => {
			if (null === modalRef.current) {
				return;
			}

			if (!modalRef.current?.contains(e.target)) {
				return setModal('inactive');
			}
			setModal('active');
		};

		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const onMouseDown = () => {

		const dragHandler = ({ movementX, movementY }) => {
			if (sizes.fullscreen) {
				turnOffFullScreen();
			}

			setTransition("")
			const left = modalRef.current?.style.left;
			const top = modalRef.current?.style.top;
			setCords({
				x: movementX + parseInt(left),
				y: movementY + parseInt(top)
			});
		};

		addEventListener('mousemove', dragHandler);

		addEventListener('mouseup', function() {
			setTransition(oldTransition.current)
			removeEventListener('mousemove', dragHandler);
			removeEventListener('mouseup	', this);
		});
	};

	const closeModal = () => {
		onClose();
		setLocalModal('not-exist');
		setTimeout(() => setModal('not-exist'), 400);
	};

	const fullScreenButtonHandler = () => {
		if (!sizes.fullscreen) {
			oldSizes.current = sizes;
			oldCords.current = cords;
			setSizes({ width: '100%', height: '100%', fullscreen: true });
			setCords({ x: 0, y: 0 });
		} else {
			turnOffFullScreen();
		}
	};

	const turnOffFullScreen = () => {
		setSizes({ ...oldSizes.current, fullscreen: false });
		setCords(oldCords.current);
	};

	return (
		<>
			{(modal !== 'not-exist' && modal !== 'collapsed') && (
				<div ref={modalRef}
						 style={{
							 top: cords.y,
							 left: cords.x,
							 minHeight,
							 minWidth,
							 width: sizes.width,
							 height: sizes.height,
							 transition
						 }}
						 onClick={e => e.stopPropagation()}
						 data-modal={localModal}
						 data-fullscreen={sizes.fullscreen}
						 className={cl.modalContainer}>
					<div onMouseDown={onMouseDown} className={cl.modalHeader}>
						<span className={cl.modalHeaderTitle}>{title}</span>
						<div className={cl.modalHeaderButtons}>
							<button onClick={() => setModal('collapsed')}>
								<img src={collapseImg} alt='' />
							</button>
							<button onClick={fullScreenButtonHandler}>
								<img src={fullScreenImg} alt='' />
							</button>
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