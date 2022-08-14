import React, { useEffect, useState } from 'react';
import TextService from '@/services/TextService';

const AnimatedSymbolsText = ({ className, delay = 200, clearDelay = delay, infinite = false, children, onClick }) => {
	const [text, setText] = useState([...children]);
	const [animate, setAnimate] = useState(false);

	const updateSymbol = (index, newValue) => {
		setText(values => values.map((value, i) => i === index ? newValue : value));
	};

	const animation = () => {
		setAnimate(true);
		let oldText = [...text];

		for (let i = 0; i < text.length; i++) {
			setTimeout(() => {
				updateSymbol(i, TextService.utf8ToHex(oldText[i]));
			}, delay * i);
			setTimeout(() => {
				updateSymbol(i, oldText[i]);
				if (i === text.length - 1 && infinite) {
					setAnimate(false);
				}
			}, (delay + clearDelay) * i);
		}
	};


	useEffect(() => {
		animation();
	}, [animate]);

	return (
		<span onClick={onClick} className={className}>
			{text.join('')}
		</span>
	);
};

export default AnimatedSymbolsText;