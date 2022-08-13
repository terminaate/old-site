import React, { useEffect, useRef, useState } from 'react';
import cl from './MovableModal.module.css';
import closeImg from '!/close.png';
import collapseImg from '!/collapse.png';
import fullScreenImg from '!/fullscreen.png';
import classes from '@/hooks/classes';

const MovableModal = ({
												modal,
												setModal,
												children,
												title = 'MovableModal',
												onClose = () => {
												},
												minWidth = '300px',
												minHeight = '150px',
												width = minWidth,
												height = minHeight,
												className
											}) => {
	const [sizes, setSizes] = useState({ width, height, fullscreen: false });
	const [cords, setCords] = useState({ x: innerWidth / 4, y: innerHeight / 7 });
	const [localModal, setLocalModal] = useState(modal);
	const [transition, setTransition] = useState('.3s ease-in-out');
	const oldTransition = useRef(transition);
	const oldSizes = useRef(sizes);
	const oldCords = useRef(cords);
	const modalRef = useRef(null);

	useEffect(() => {
		setTimeoutModal(modal);
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

	const onMouseDown = e => {
		const clickedX = e.clientX - cords.x;
		const clickedY = e.clientY - cords.y;
		let isDragFullScreen = false;

		const dragHandler = (e) => {
			const x = e.clientX - clickedX;
			const y = e.clientY - clickedY;

			if (sizes.fullscreen) {
				turnOffFullScreen();
				isDragFullScreen = false;
				setCords({ x: cords.x - clickedX, y: cords.y - clickedX });
			} else {
				isDragFullScreen = e.clientY < 0;
			}

			setTransition('');

			setCords({ x, y });
		};

		addEventListener('mousemove', dragHandler);

		addEventListener('mouseup', function() {
			setTransition(oldTransition.current);
			if (isDragFullScreen) {
				turnOnFullScreen();
				isDragFullScreen = false;
			}
			removeEventListener('mousemove', dragHandler);
			removeEventListener('mouseup	', this);
		});
	};

	const setTimeoutModal = (state) => {
		setLocalModal(state);
		setTimeout(() => setModal(state), 400);
	};

	const closeModal = () => {
		onClose();
		setTimeoutModal('not-exist');
	};

	const fullScreenButtonHandler = () => {
		if (!sizes.fullscreen) {
			turnOnFullScreen();
		} else {
			turnOffFullScreen();
			setCords(oldCords.current);
		}
	};

	const turnOnFullScreen = () => {
		oldSizes.current = sizes;
		oldCords.current = cords;
		setSizes({ width: '100%', height: '95%', fullscreen: true });
		setCords({ x: 0, y: innerHeight - (innerHeight / 100) * 95 });
	};

	const turnOffFullScreen = () => {
		setSizes({ ...oldSizes.current, fullscreen: false });
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
					<div onMouseDown={onMouseDown} onDoubleClick={fullScreenButtonHandler} className={cl.modalHeader}>
						<span className={cl.modalHeaderTitle}>{title}</span>
						<div className={cl.modalHeaderButtons}>
							<button onClick={() => setTimeoutModal('collapsed')}>
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
					<div className={classes(cl.modalContent, className)}>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default MovableModal;