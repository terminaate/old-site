import React, { useContext, useState } from 'react';
import cl from './Header.module.css';
import downArrow from '!/down-arrow.png';
import statsImg from '!/stats.png';
import StatsModal from '../StatsModal/StatsModal';
import GithubModal from '../GithubModal/GithubModal';
import githubImg from '!/logos/github.svg';
import discordImg from '!/logos/discord.svg';
import settingsImg from '!/settings.svg';
import SettingsModal from '../SettingsModal/SettingsModal';
import MainScreenContext from '../../contexts/MainScreenContext';

const Header = () => {
	const [header, setHeader] = useState(false);
	const [statsModal, setStatsModal] = useState('not-exist');
	const [githubModal, setGithubModal] = useState('not-exist');
	// const [discordNotify, setDiscordNotify] = useState('');
	const [settingsModal, setSettingsModal] = useState('not-exist');
	const [mainContext, setMainContext] = useContext(MainScreenContext);

	const setModalState = (state, setState) => {
		if (state !== 'not-exist') {
			setState();
		}
	};

	// TODO
	// Write backend for sending message to me from bot xD

	const copyDiscordTag = () => {
		navigator.clipboard.writeText('Terminaate#9274');
		alert('Discord tag copied!');
	};

	const inactiveAllModals = () => {
		setModalState(statsModal, () => setStatsModal('inactive'));
		setModalState(githubModal, () => setGithubModal('inactive'));
		setModalState(settingsModal, () => setSettingsModal('inactive'));
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
					<div className={cl.headerButton}>
						<div data-modal={'not-exist'} className={cl.headerLine} />
						<button onClick={copyDiscordTag}>
							<img src={discordImg} alt='' />
						</button>
					</div>
					<div className={cl.headerButton}>
						<div data-modal={settingsModal} className={cl.headerLine} />
						<button onClick={() => openModal(settingsModal, setSettingsModal)}>
							<img src={settingsImg} alt='' />
						</button>
					</div>
				</div>
				<button onClick={() => setHeader(!header)} data-header={header} className={cl.triggerHeaderButton}>
					<img src={downArrow} alt='' />
				</button>
			</div>
			<StatsModal modal={statsModal} setModal={setStatsModal} />
			<GithubModal modal={githubModal} setModal={setGithubModal} />
			{/*<Notification state={discordNotify} setState={setDiscordNotify} />*/}
			<SettingsModal modal={settingsModal} setModal={setSettingsModal} />
		</>
	);
};

export default Header;