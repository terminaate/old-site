import React, { useEffect, useState } from 'react';
import cl from './TypingText.module.css';

const TypingText = ({ text, defaultDelay = 300, className, onClick }) => {
	const [renderedWords, setRenderedWords] = useState([]);


	useEffect(() => {
		if (typeof text === 'string') {
			text = text.split(' ').map(obj => Boolean(Number(obj)) ? Number(obj) : obj);
		}

		const formatedText = [];

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
				setRenderedWords(words => [...words, formatedText[i].text]);
			}, (formatedText[i].delay ? formatedText[i].delay : defaultDelay) * i);
		}
	}, []);

	return (
		<div className={cl.typingTextContainer}>
			{renderedWords.map((obj, key) => (
				<span onClick={onClick} className={className} key={key}>{obj}</span>
			))}
		</div>
	);
};

export default TypingText;