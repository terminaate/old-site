import React, { FC, useEffect, useRef, useState } from 'react';
import cl from './IntroScreen.module.css';
import TypingText from '@/components/TypingText';
import Particles from '@/components/Particles';

interface IIntroScreen {
	setIntro: React.Dispatch<React.SetStateAction<boolean>>
}

const IntroScreen: FC<IIntroScreen> = ({ setIntro }) => {
	const [introEnded, setIntroEnded] = useState<boolean>(false);
	const visited = useRef<boolean>(Boolean(Math.floor(Math.random() * 2)));
	const containerRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		addEventListener('mousemove', onMouseMoveEventHandler);

		return () => removeEventListener('mousemove', onMouseMoveEventHandler);
	}, []);

	const skipButtonClickHandler = () => {
		setIntroEnded(true);
		setTimeout(() => setIntro(false), 500);
	};

	const onMouseMoveEventHandler = (e: MouseEvent) => {
		containerRef.current!.style.transform = `translate(${(window.innerWidth - e.pageX * 1.4) / 90}px, ${(window.innerHeight - e.pageY * 1.4) / 90}px)`;
		backgroundRef.current!.style.transform = `translate(${(window.innerHeight - e.pageY * 1.4) / 90}px, ${(window.innerWidth - e.pageX * 1.4) / 90}px)`;
	};

	return (
		<div className={cl.introScreen} data-intro={introEnded}>
			<div ref={backgroundRef} className={cl.introScreenBackground}>
				<Particles />
			</div>
			<div className={cl.introScreenForeground}>
				<div ref={containerRef} className={cl.introScreenContainer}>
					<TypingText
						onClick={(e: React.MouseEvent<HTMLElement> & { target: HTMLElement }) => e.target.style.background = 'none'}
						className={visited.current ? cl.introTypingVisitedText : ''}
						text={'A programmer is a person who writes code and compiles it himself into an executable file, so we are all "script kiddy")'} />
					<div data-intro={introEnded} onClick={skipButtonClickHandler}
							 className={cl.introSkipButton}>
						<span>-</span>
						<span>{visited.current ? 'skip' : 'who.... cares?'}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IntroScreen;