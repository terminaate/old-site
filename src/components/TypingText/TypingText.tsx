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
		if (!Array.isArray(text)) {
			text = text.split(' ').map(obj => Boolean(Number(obj)) ? Number(obj) : obj);
		}

		const formattedText: any[] = [];

		for (let i = 0; i < text.length; i++) {
			if (typeof text[i] === 'number' && typeof text[i + 1] === 'string') {
				formattedText.push({ text: text[i + 1], delay: text[i] });
			} else if (typeof text[i] === 'string' && typeof text[i - 1] !== 'number') {
				formattedText.push({ text: text[i] });
			} else if (typeof text[i] === 'number' && typeof text[i + 1] !== 'string') {
				formattedText.push({ delay: text[i] });
			}
		}

		for (let i in formattedText) {
			setTimeout(() => {
				setRenderedWords((words: string[]) => [...words, formattedText[i].text]);
			}, (formattedText[i].delay ? formattedText[i].delay : defaultDelay) * Number(i));
		}
	}, []);

	return (
		<div className={cl.typingTextContainer}>
			{renderedWords.map((obj, key) => (
				<>
					{
						animatedSymbols ? <AnimatedSymbolsText key={key} onClick={onClick} className={className}>{obj}</AnimatedSymbolsText> :
							<span onClick={onClick} className={className} key={key}>{obj}</span>
					}
				</>
			))}
		</div>
	);
};

export default TypingText;