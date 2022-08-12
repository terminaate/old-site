import React, { useState } from 'react';
import cl from './Header.module.css';
import downArrow from '!/down-arrow.png';
import statsImg from '!/stats.png';
import StatsModal from '../StatsModal/StatsModal';

const Header = () => {
	const [header, setHeader] = useState(false);
	const [statsModal, setStatsModal] = useState('not-exist');

	const collapseAllModals = () => {
		statsModal !== 'not-exist' && setStatsModal('collapsed');
	};

	return (
		<>
			<div className={cl.headerContainer}>
				<div data-header={header} className={cl.headerContent}>
					<div className={cl.headerButton}>
						<div data-modal={statsModal} className={cl.headerLine} />
						<button onClick={() => setStatsModal('active')}>
							<img src={statsImg} alt='' />
						</button>
					</div>
					<button className={cl.collapseAllButton} onClick={collapseAllModals} />
				</div>
				<button onClick={() => setHeader(!header)} data-header={header} className={cl.triggerHeaderButton}>
					<img src={downArrow} alt='' />
				</button>
			</div>
			<StatsModal modal={statsModal} setModal={setStatsModal} />
		</>
	);
};

export default Header;