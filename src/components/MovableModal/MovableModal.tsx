import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import cl from './MovableModal.module.css';
import closeImg from '!/close.png';
import collapseImg from '!/collapse.png';
import fullScreenImg from '!/fullscreen.png';
import classnames from '@/utils/classnames';
import useOutsideClick from '@/hooks/useOutsideClick';

export type MovableModalStatement = 'not-exist' | 'collapsed' | 'active' | 'inactive'

interface IMovableModal {
	modal: MovableModalStatement;
	setModal: React.Dispatch<React.SetStateAction<MovableModalStatement>>;
	children?: ReactNode;
	title?: string;
	onClose?: () => void;
	minWidth?: string;
	minHeight?: string;
	width?: string;
	height?: string;
	initialX?: number;
	initialY?: number;
	className?: string;
}

const MovableModal: FC<IMovableModal> = ({
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
																					 initialX = innerWidth / 4,
																					 initialY = innerHeight / 7,
																					 className = ''
																				 }) => {
	const [sizes, setSizes] = useState({ width, height, fullscreen: false });
	const [cords, setCords] = useState({ x: initialX, y: initialY });
	const [localModal, setLocalModal] = useState(modal);
	const [transition, setTransition] = useState('.3s ease-in-out');
	const oldTransition = useRef(transition);
	const oldSizes = useRef(sizes);
	const oldCords = useRef(cords);
	const modalRef = useRef(null);

	// TODO
	// Fix bug with fullscreen

	useEffect(() => {
		setTimeoutModal(modal);
	}, [modal]);

	useOutsideClick(modalRef, () => setModal('inactive'), () => setModal('active'));

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const clickedX = e.clientX - cords.x;
		const clickedY = e.clientY - cords.y;
		let isDragFullScreen = false;

		const dragHandler = (e: MouseEvent) => {
			const x = e.clientX - clickedX;
			const y = e.clientY - clickedY;


			if (sizes.fullscreen && y > 0) {
				turnOffFullScreen();
				isDragFullScreen = false;
				setCords({ x, y });
			}

			isDragFullScreen = y < 0;

			setTransition('');
			setCords({ x, y });
		};

		addEventListener('mousemove', dragHandler);

		const onMouseUp = () => {
			setTransition(oldTransition.current);
			if (isDragFullScreen) {
				turnOnFullScreen();
				isDragFullScreen = false;
			}
			removeEventListener('mousemove', dragHandler);
			removeMouseUp();
		};

		const removeMouseUp = () => {
			removeEventListener('mouseup', onMouseUp);
		};

		addEventListener('mouseup', onMouseUp);
	};

	const setTimeoutModal = (state: MovableModalStatement) => {
		setLocalModal(state);
		setTimeout(() => setModal(state), 400);
	};

	const closeModal = () => {
		onClose();
		setTimeoutModal('not-exist');
		setTimeout(() => {
			setCords({ x: initialX, y: initialY });
			setSizes({ width, height, fullscreen: false });
		}, 400);
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
		oldSizes.current = !sizes.fullscreen ? sizes : oldSizes.current;
		oldCords.current = cords;
		setSizes({ width: '100%', height: '95%', fullscreen: true });
		setCords({ x: 0, y: innerHeight - (innerHeight / 100) * 95 });
	};

	const turnOffFullScreen = () => {
		setSizes({ ...oldSizes.current, fullscreen: false });
	};

	// TODO
	// Do a borders container, and border events for resizing a modal

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
						 className={classnames(cl.modalContainer, className)}>
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
					<div className={cl.modalContent}>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default MovableModal;