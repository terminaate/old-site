import React, { FC, useEffect } from 'react';
import cl from './Notification.module.css';

interface INotification {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	timeout?: number;
}

const Notification: FC<INotification> = ({ state, setState, timeout = 1500 }) => {
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