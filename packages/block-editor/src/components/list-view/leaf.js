/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __experimentalTreeGridRow as TreeGridRow } from '@wordpress/components';

export default function ListViewLeaf( {
	position,
	level,
	rowCount,
	children,
	className,
	...props
} ) {
	return (
		<TreeGridRow
			className={ classnames( 'block-editor-list-view-leaf', className ) }
			level={ level }
			positionInSet={ position }
			setSize={ rowCount }
			{ ...props }
		>
			{ children }
		</TreeGridRow>
	);
}
