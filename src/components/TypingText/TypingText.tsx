import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import cl from './TypingText.module.css';
import AnimatedSymbolsText from '../AnimatedSymbolsText';

interface ITypingText {
	text: string | (string | number)[];
	defaultDelay?: number;
	className?: string;
	onClick?: MouseEventHandler;
	animatedSymbols?: boolean;
}

const TypingText: FC<ITypingText> = ({
																			 text,
																			 defaultDelay = 300,
																			 className = '',
																			 onClick,
																			 animatedSymbols = false
																		 }) => {
	const [renderedWords, setRenderedWords] = useState<string[]>([]);

	useEffect(() => {
		if (typeof text === 'string') {
			text = text.split(' ').map(obj => Boolean(Number(obj)) ? Number(obj) : obj);
		}

		const formatedText: any[] = [];

		for (let i = 0; i < text.length; i++) {
			if (typeof text[i] === 'number' && typeof text[i + 1] === 'string') {
				formatedText.push({ text: text[i + 1], delay: text[i] });
			} else if (typeof text[i] === 'string' && typeof text[i - 1] !== 'number') {
				formatedText.push({ text: text[i] });
			} else if (typeof text[i] === 'number' && typeof text[i + 1] !== 'string') {
				formatedText.push({ delay: text[i] });
			}
		}

		for (let i in formatedText) {
			setTimeout(() => {
				setRenderedWords((words: string[]) => [...words, formatedText[i].text]);
			}, (formatedText[i].delay ? formatedText[i].delay : defaultDelay) * Number(i));
		}
	}, []);

	return (
		<div className={cl.typingTextContainer}>
			{renderedWords.map((obj, key) => (
				<>
					{
						animatedSymbols ? <AnimatedSymbolsText onClick={onClick} className={className}>{obj}</AnimatedSymbolsText> :
							<span onClick={onClick} className={className} key={key}>{obj}</span>
					}
				</>
			))}
		</div>
	);
};

export default TypingText;