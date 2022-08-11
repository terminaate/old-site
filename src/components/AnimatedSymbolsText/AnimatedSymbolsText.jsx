import React, { useEffect, useState } from 'react';

const AnimatedSymbolsText = ({ className, delay = 200, clearDelay = delay, infinite = false, children }) => {
	const [text, setText] = useState([...children]);
	const [animate, setAnimate] = useState(false);

	function utf8ToHex(s) {
		const utf8encoder = new TextEncoder();
		const rb = utf8encoder.encode(s);
		let r = '';
		for (const b of rb) {
			r += '0x' + ('0' + b.toString(16)).slice(-2);
		}
		return r;
	}

	const updateSymbol = (index, newValue) => {
		setText(values => values.map((value, i) => i === index ? newValue : value));
	};

	const animation = () => {
		setAnimate(true);
		let oldText = [...text];

		for (let i = 0; i < text.length; i++) {
			setTimeout(() => {
				updateSymbol(i, utf8ToHex(oldText[i]));
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
		<span className={className}>
			{text.join('')}
		</span>
	);
};

export default AnimatedSymbolsText;