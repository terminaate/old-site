import cl from './SettingsModal.module.css';
import MovableModal, { MovableModalStatement } from '../MovableModal';
import React, { FC } from 'react';
import RangeInput from '../UI/RangeInput';

interface ISettingsModal {
	modal: MovableModalStatement;
	setModal: React.Dispatch<React.SetStateAction<MovableModalStatement>>;
}

const SettingsModal: FC<ISettingsModal> = ({ modal, setModal }) => {
	return (
		<MovableModal title={'⚙️Settings'} className={cl.settingsModal} width={'27%'} minWidth={'400px'} height={'75%'}
									modal={modal}
									setModal={setModal}>
			<div className={cl.settingContainer}>
				<h1 className={cl.settingTitle}>Particles count:</h1>
				<RangeInput />
			</div>
		</MovableModal>
	);
};

export default SettingsModal;