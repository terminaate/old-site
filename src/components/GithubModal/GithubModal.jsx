import React, { memo, useEffect, useState } from 'react';
import MovableModal from '../MovableModal/MovableModal';
import cl from './GithubModal.module.css';
import GithubService from '@/services/GithubService';
import usersImg from '!/users.png';
import locationImg from '!/location.png';
import linkImg from '!/link.png';
import clockImg from '!/clock.svg';
import htmlImg from '!/logos/html.svg';
import cssImg from '!/logos/css.svg';
import javascriptImg from '!/logos/javascript.svg';
import typescriptImg from '!/logos/typescript.svg';
import pythonImg from '!/logos/python.svg';
import classes from '@/hooks/classes';
import AnimatedSymbolsText from '../AnimatedSymbolsText/AnimatedSymbolsText';


const GithubModal = ({ modal, setModal }) => {
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);

	const setAsyncState = (setState, promise) => {
		promise.then(r => r.status === 200 ? setState(r.body) : '');
	};

	const getLanguageIcon = (lang) => {
		const langs = {
			'JavaScript': javascriptImg,
			'Python': pythonImg,
			'HTML': htmlImg,
			'CSS': cssImg,
			'TypeScript': typescriptImg
		};
		return langs[lang];
	};

	useEffect(() => {
		setAsyncState(setUser, GithubService.getMe());
		setAsyncState(setRepos, GithubService.getMyRepos());
	}, []);

	const getDateAndMonthName = (date) => {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return `${date.getDate()} ${months[date.getMonth()]}`;
	};

	return (
		<>
			{Object.values(user).length > 0 && (
				<MovableModal minWidth={'800px'} className={cl.githubModal} width={'50%'} title={'❤️My github️'}
											height={'60%'} modal={modal}
											setModal={setModal}>
					<div className={cl.userInfo}>
						<div className={cl.userAvatar} style={{ backgroundImage: `url(${user.avatar_url})` }} />
						<span  className={cl.userName}>{user.name}</span>
						<AnimatedSymbolsText onClick={() => open("//github.com/terminaate")} infinite={true} className={cl.userNickname}>{user.login}</AnimatedSymbolsText>
						<span className={cl.userBio}>{user.bio}</span>
						<div className={cl.userFollowers}>
							<img src={usersImg} alt='' />
							<span>{user.followers} <span>followers</span></span>
						</div>
						<div className={classes(cl.userFollowers, cl.userLocation)}>
							<img src={locationImg} alt='' />
							<span>{user.location}</span>
						</div>
						<div className={classes(cl.userFollowers, cl.userLocation)}>
							<img src={linkImg} alt='' />
							<span>{user.blog}</span>
						</div>
					</div>
					<div className={cl.userRepos}>
						{repos.map((repo, index) => (
							<div className={cl.repoContainer} key={index}>
								<div className={cl.repoHeader}>
									<div className={cl.repoName} onClick={() => open(repo.svn_url, '_blank')}>
										<img src={repo.owner.avatar_url} alt='' />
										<span>{repo.full_name}</span>
									</div>
									<img className={cl.repoLanguage} src={getLanguageIcon(repo.language)} alt='' />
								</div>
								<div className={cl.repoDesc}>{repo.description}</div>
								<div className={cl.repoLastCommit}>
									<img src={clockImg} alt='' />
									<span>{getDateAndMonthName(new Date(repo.updated_at))} - last commit</span>
								</div>
							</div>
						))}
					</div>
				</MovableModal>
			)}
		</>
	);
};

export default memo(GithubModal);