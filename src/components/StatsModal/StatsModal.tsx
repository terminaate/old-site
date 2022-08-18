import React, { FC, useEffect, useState } from 'react';
import MovableModal, { MovableModalStatement } from '../MovableModal';
import cl from './StatsModal.module.css';

interface IStatsModal {
	modal: MovableModalStatement;
	setModal: React.Dispatch<React.SetStateAction<MovableModalStatement>>;
}

const StatsModal: FC<IStatsModal> = ({ modal, setModal }) => {
	const [stats, setStats] = useState<Array<{ [key: string]: string | boolean }>>([]);

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
		} = navigator as Navigator & { buildID: string; oscpu: string };

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
				'Do not track': Boolean(parseInt(doNotTrack as string)),
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