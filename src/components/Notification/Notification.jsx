import { useEffect } from 'react';
import cl from './Notification.module.css';

const Notification = ({ state, setState, timeout = 1500 }) => {
	useEffect(() => {
		setTimeout(() => setState(''), timeout);
	}, [state]);

	// TODO
	// Rewrite logic and add normal animation

	return (
		<>
			{state && (
				<div data-state={state} className={cl.notificationContainer}>
					{state}
				</div>
			)}
		</>
	);
};

export default Notification;