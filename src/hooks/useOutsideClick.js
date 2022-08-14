import { useEffect } from 'react';

export default (ref, then, elseThen) => {
	useEffect(() => {
		const handler = (e) => {
			if (null === ref.current) {
				return;
			}

			const isNotHeader = ![...e.target.attributes].find(obj => obj.name === 'data-header');
			const isNotHeaderChild = ![...e.target.offsetParent.attributes].find(obj => obj.name === 'data-header');

			if (!ref.current?.contains(e.target) && isNotHeader && isNotHeaderChild) {
				then();
			} else if (isNotHeader && isNotHeaderChild) {
				elseThen();
			}
		};

		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);
}