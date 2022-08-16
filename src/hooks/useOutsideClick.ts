import { RefObject, useEffect } from 'react';

export default (ref: RefObject<HTMLElement>, then: () => void, elseThen: () => void) => {
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			const { target } = e as MouseEvent & { target: HTMLElement };
			if (null === ref.current) {
				return;
			}

			const isNotHeader = ![...target.attributes].find(obj => obj.name === 'data-header');
			const isNotHeaderChild = ![...target.offsetParent!.attributes].find(obj => obj.name === 'data-header');

			if (!ref.current?.contains(target) && isNotHeader && isNotHeaderChild) {
				then();
			} else if (isNotHeader && isNotHeaderChild) {
				elseThen();
			}
		};

		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);
}