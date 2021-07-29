/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import type { CSSProperties, ReactNode } from 'react';
import type { useDrag } from 'react-use-gesture';

/**
 * Internal dependencies
 */
import type { StateReducer } from './reducer/state';
import type { FlexProps } from '../flex/types';
import type { PolymorphicComponentProps } from '../ui/context';

// @todo ??? What is edge ???
export type LabelPosition = 'top' | 'bottom' | 'side' | 'edge';

export type DragDirection = 'n' | 's' | 'e' | 'w';

export type DragProps = Parameters< Parameters< typeof useDrag >[ 0 ] >[ 0 ];

interface BaseProps {
	__unstableInputWidth?: CSSProperties[ 'width' ];
	hideLabelFromVision?: boolean;
	isFocused?: boolean;
	labelPosition?: LabelPosition;
	size?: 'default' | 'small';
}

export interface InputFieldProps extends BaseProps {
	dragDirection?: DragDirection;
	dragThreshold?: number;
	isDragEnabled?: boolean;
	isPressEnterToChange?: boolean;
	onChange?: ( nextValue: string ) => void;
	onValidate?: ( nextValue: string ) => void;
	setIsFocused?: ( isFocused: boolean ) => void;
	stateReducer?: StateReducer;
	value?: string;
	onDragEnd?: ( dragProps: DragProps ) => void;
	onDragStart?: ( dragProps: DragProps ) => void;
	onDrag?: ( dragProps: DragProps ) => void;
}

export interface InputBaseProps extends BaseProps, FlexProps {
	children: ReactNode;
	prefix?: ReactNode;
	suffix?: ReactNode;
	disabled?: boolean;
	className?: string;
	id?: string;
	label?: ReactNode;
}

export interface InputControlProps
	extends Omit< InputBaseProps, 'children' >,
		Omit<
			PolymorphicComponentProps< InputFieldProps, 'input', false >,
			'stateReducer' | 'prefix'
		> {
	__unstableStateReducer?: InputFieldProps[ 'stateReducer' ];
}

export interface InputControlLabelProps {
	children: ReactNode;
	hideLabelFromVision?: BaseProps[ 'hideLabelFromVision' ];
	labelPosition?: BaseProps[ 'labelPosition' ];
	size?: BaseProps[ 'size' ];
}
