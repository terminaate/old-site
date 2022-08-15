import cl from './SettingsModal.module.css';
import MovableModal from '../MovableModal/MovableModal';

const SettingsModal = ({ modal, setModal }) => {
	return (
		<MovableModal className={cl.settingsModal} width={'40%'} minWidth={'500px'} height={'50%'} modal={modal}
									setModal={setModal}>
			Settings Modal
		</MovableModal>
	);
};

export default SettingsModal;