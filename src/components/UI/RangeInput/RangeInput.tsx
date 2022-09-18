import classnames from '@/utils/classnames';
import cl from './RangeInput.module.css';
import { FC, InputHTMLAttributes } from 'react';

interface IRangeInput extends InputHTMLAttributes<any> {
	className?: string;
}

const RangeInput: FC<IRangeInput> = ({ className = '', ...props }) => {
	return (
		<input className={classnames(cl.UIRangeInput, className)} type='range' {...props} />
	);
};

export default RangeInput;