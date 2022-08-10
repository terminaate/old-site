import React, { useEffect, useRef } from 'react';
import cl from './IntroScreen.module.css';
import TypingText from '../../components/TypingText/TypingText';
import Particles from '../../components/Particles/Particles';

const IntroScreen = ({ setIsIntroEnded, isIntroEnded }) => {
	const visited = useRef(Boolean(localStorage.getItem('visited')));
	const containerRef = useRef(null);
	const backgroundRef = useRef(null);

	useEffect(() => {
		if (!localStorage.getItem('visited')) {
			localStorage.setItem('visited', 'true');
		}
	}, []);

	const skipButtonClickHandler = () => {
		setIsIntroEnded(true);
	};

	const onMouseMoveEventHandler = (e) => {
		containerRef.current.style.transform = `translate(${(window.innerWidth - e.pageX * 2) / 90}px, ${(window.innerHeight - e.pageY * 2) / 90}px)`;
		backgroundRef.current.style.transform = `translate(${(window.innerHeight - e.pageY * 2) / 90}px, ${(window.innerWidth - e.pageX * 2) / 90}px)`;
	};

	addEventListener('mousemove', onMouseMoveEventHandler);

	return (
		<div className={cl.introScreen} data-intro={isIntroEnded}>
			<div ref={backgroundRef} className={cl.introScreenBackground}>
				<Particles />
			</div>
			<div className={cl.introScreenForeground}>
				<div ref={containerRef} className={cl.introScreenContainer}>
					<TypingText onClick={e => e.target.style.background = 'none'}
											className={visited.current ? cl.introTypingVisitedText : ''}
											text={'A programmer is a person who writes code and compiles it himself into an executable file, so we are all "script kiddy", remember that bitches)'} />
					<div data-intro={isIntroEnded} onClick={skipButtonClickHandler}
							 className={cl.introSkipButton}>
						<span>-</span>
						<span>{visited.current ? 'skip' : 'shut up 14yo "programmer"'}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IntroScreen;