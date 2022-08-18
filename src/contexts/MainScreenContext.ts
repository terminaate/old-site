import { createContext } from 'react';
import { IParticles } from '@/components/Particles/Particles';

export type MainScreenContextProps = {
	particlesConfig: IParticles;
}

export type MainScreenContextType = {
	mainScreenContext: MainScreenContextProps;
	setMainScreenContext: (value: MainScreenContextProps) => void;
}

const MainScreenContext = createContext<MainScreenContextType>({
	mainScreenContext: ({} as MainScreenContextProps),
	setMainScreenContext: (value: MainScreenContextProps): void => {
	}
});

export default MainScreenContext;