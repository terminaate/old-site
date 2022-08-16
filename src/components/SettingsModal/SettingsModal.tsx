import cl from './SettingsModal.module.css';
import MovableModal, { MovableModalStatement } from '../MovableModal/MovableModal';
import RangeInput from '../UI/RangeInput/RangeInput';
import React, { FC } from 'react';

interface ISettingsModal {
	modal: MovableModalStatement;
	setModal: React.Dispatch<React.SetStateAction<MovableModalStatement>>;
}

const SettingsModal: FC<ISettingsModal> = ({ modal, setModal }) => {

	// TODO
	// Do a normal settings, edit particles config in main screen using MainScreenContext, and settings all UI Components

	return (
		<MovableModal title={'⚙️Settings'} className={cl.settingsModal} width={'27%'} minWidth={'400px'} height={'75%'}
									modal={modal}
									setModal={setModal}>
			<RangeInput min={0} max={1000} defaultValue={0} />
		</MovableModal>
	);
};

export default SettingsModal;