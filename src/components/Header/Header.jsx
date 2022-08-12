import React, { useState } from 'react';
import cl from './Header.module.css';
import downArrow from '../../assets/img/down-arrow.png';

const Header = () => {
	const [header, setHeader] = useState(false);

	return (
		<div className={cl.headerContainer}>
			<div data-header={header} className={cl.headerContent}>
				Hello world
			</div>
			<button onClick={() => setHeader(!header)} data-header={header} className={cl.triggerHeaderButton}>
				<img src={downArrow} alt='' />
			</button>
		</div>
	);
};

export default Header;