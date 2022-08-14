import React, { memo, useEffect, useState } from 'react';
import MovableModal from '../MovableModal/MovableModal';
import cl from './GithubModal.module.css';
import GithubService from '@/services/GithubService';
import usersImg from '!/users.png';
import locationImg from '!/location.png';
import linkImg from '!/link.png';
import classes from '@/hooks/classes';

const GithubModal = ({ modal, setModal }) => {
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);

	const setAsyncState = (setState, promise) => {
		promise.then(r => r.status === 200 ? setState(r.body) : '');
	};

	useEffect(() => {
		setAsyncState(setUser, GithubService.getMe());
		setAsyncState(setRepos, GithubService.getMyRepos());
	}, []);

	return (
		<>
			{Object.values(user).length > 0 && (
				<MovableModal minWidth={"800px"} className={cl.githubModal} width={'50%'} title={'My github ❤'}
											height={'60%'} modal={modal}
											setModal={setModal}>
					<div className={cl.userInfo}>
						<div className={cl.userAvatar} style={{ backgroundImage: `url(${user.avatar_url})` }} />
						<span className={cl.userName}>{user.name}</span>
						<span className={cl.userNickname}>{user.login}</span>
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
						Hello world 2
					</div>
				</MovableModal>
			)}
		</>
	);
};

export default memo(GithubModal);