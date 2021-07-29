/**
 * External dependencies
 */
import { motion } from 'framer-motion';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

const TREE_GRID_ROW_VARIANTS = {
	init: {
		opacity: 0,
	},
	open: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};

function TreeGridRow(
	{ children, level, positionInSet, setSize, isExpanded, ...props },
	ref
) {
	return (
		// Disable reason: Due to an error in the ARIA 1.1 specification, the
		// aria-posinset and aria-setsize properties are not supported on row
		// elements. This is being corrected in ARIA 1.2. Consequently, the
		// linting rule fails when validating this markup.
		//
		// eslint-disable-next-line jsx-a11y/role-supports-aria-props
		<motion.tr
			layout
			initial={ 'init' }
			animate={ 'open' }
			exit={ 'exit' }
			variants={ TREE_GRID_ROW_VARIANTS }
			{ ...props }
			ref={ ref }
			role="row"
			aria-level={ level }
			aria-posinset={ positionInSet }
			aria-setsize={ setSize }
			aria-expanded={ isExpanded }
		>
			{ children }
		</motion.tr>
	);
}

export default forwardRef( TreeGridRow );
