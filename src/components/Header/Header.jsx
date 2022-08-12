import React, { useState } from 'react';
import cl from './Header.module.css';
import downArrow from '!/down-arrow.png';
import statsImg from '!/stats.png';
import MovableModal from '@/components/MovableModal/MovableModal';

const Header = () => {
	const [header, setHeader] = useState(false);
	const [statsModal, setStatsModal] = useState('active');

	return (
		<>
			<div className={cl.headerContainer}>
				<div data-header={header} className={cl.headerContent}>
					<button onClick={() => setStatsModal('active')}>
						<img src={statsImg} alt='' />
					</button>
				</div>
				<button onClick={() => setHeader(!header)} data-header={header} className={cl.triggerHeaderButton}>
					<img src={downArrow} alt='' />
				</button>
			</div>
			<MovableModal modal={statsModal} setModal={setStatsModal}>
				MY STATS MODAL
			</MovableModal>
		</>
	);
};

export default Header;