import cl from './SettingsModal.module.css';
import MovableModal from '../MovableModal/MovableModal';

const SettingsModal = ({ modal, setModal }) => {

	// TODO
	// Do a normal settings, edit particles config in main screen using MainScreenContext, and settings all UI Components

	return (
		<MovableModal title={'⚙️Settings'} className={cl.settingsModal} width={'27%'} minWidth={"400px"} height={'75%'}
									modal={modal}
									setModal={setModal}>
			Settings Modal
		</MovableModal>
	);
};

export default SettingsModal;