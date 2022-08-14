import React, { useState } from 'react';
import cl from './Header.module.css';
import downArrow from '!/down-arrow.png';
import statsImg from '!/stats.png';
import StatsModal from '../StatsModal/StatsModal';
import GithubModal from '../GithubModal/GithubModal';
import githubImg from '!/logos/github.svg';

const Header = () => {
	const [header, setHeader] = useState(false);
	const [statsModal, setStatsModal] = useState('not-exist');
	const [githubModal, setGithubModal] = useState('not-exist');

	const setModalState = (state, setState) => {
		if (state !== 'not-exist') {
			setState();
		}
	};

	const inactiveAllModals = () => {
		setModalState(statsModal, () => setStatsModal('inactive'));
		setModalState(githubModal, () => setGithubModal('inactive'));
	};

	const openModal = (state, setState) => {
		if (state !== 'active') {
			inactiveAllModals();
			setState('active');
		} else {
			setState('collapsed');
		}
	};

	return (
		<>
			<div className={cl.headerContainer}>
				<div data-header={header} className={cl.headerContent}>
					<div className={cl.headerButton}>
						<div data-modal={statsModal} className={cl.headerLine} />
						<button onClick={() => openModal(statsModal, setStatsModal)}>
							<img src={statsImg} alt='' />
						</button>
					</div>
					<div className={cl.headerButton}>
						<div data-modal={githubModal} className={cl.headerLine} />
						<button onClick={() => openModal(githubModal, setGithubModal)}>
							<img src={githubImg} alt='' />
						</button>
					</div>
				</div>
				<button onClick={() => setHeader(!header)} data-header={header} className={cl.triggerHeaderButton}>
					<img src={downArrow} alt='' />
				</button>
			</div>
			<StatsModal modal={statsModal} setModal={setStatsModal} />
			<GithubModal modal={githubModal} setModal={setGithubModal} />
		</>
	);
};

export default Header;