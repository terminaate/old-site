import React, { useEffect, useState } from 'react';
import MovableModal from '../MovableModal/MovableModal';
import cl from './StatsModal.module.css';

const StatsModal = ({ modal, setModal }) => {
	const [stats, setStats] = useState([]);

	useEffect(() => {

		const {
			language,
			appCodeName,
			appVersion,
			buildID,
			cookieEnabled,
			doNotTrack,
			oscpu,
			platform,
			userAgent,
			webdriver,
			product
		} = navigator;

		console.log(navigator);

		setStats([
			{
				'Language': language
			},
			{
				'Resolution': `${innerHeight} x ${innerWidth}`,
				'Max resolution': `${window.screen.width * window.devicePixelRatio} x ${window.screen.height * window.devicePixelRatio}`
			},
			{
				'App code name': appCodeName,
				'App version': appVersion,
				'Build ID': buildID,
				'Is Cookie enabled': cookieEnabled,
				'Do not track': Boolean(parseInt(doNotTrack)),
				'OS': oscpu,
				'Platform': platform,
				'User Agent': userAgent,
				'Web driver': webdriver,
				'Product': product
			}
		]);
	}, []);

	return (
		<MovableModal minWidth={'400px'} className={cl.statsModal} title={'⚡Stats'} width={'27%'} height={'75%'}
									modal={modal} setModal={setModal}>
			{stats.map((value, index) => (
				<div className={cl.statsContainer} key={index} onClick={() => console.log(value)}>
					{Object.keys(value).map((key, valueIndex) => (
						<div className={cl.statContainer} key={valueIndex} data-even={valueIndex % 2 === 0}>
							{key} - {String(value[key])}
						</div>
					))}
				</div>
			))}
		</MovableModal>
	);
};

export default StatsModal;