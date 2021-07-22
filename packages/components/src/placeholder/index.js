/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	useResizeObserver,
	useRefEffect,
	useConstrainedTabbing,
} from '@wordpress/compose';
import { useState, createPortal } from '@wordpress/element';
import { ENTER, SPACE, ESCAPE } from '@wordpress/keycodes';
import { focus } from '@wordpress/dom';

/**
 * Internal dependencies
 */
import Icon from '../icon';
import StyleProvider from '../style-provider';

function AdminShadow( { children, label } ) {
	const [ shadow, setShadow ] = useState();
	const [ hasFocus, setHasFocus ] = useState();
	const ref = useRefEffect( ( element ) => {
		const root = element.attachShadow( { mode: 'open' } );
		Array.from( document.styleSheets ).forEach( ( { ownerNode } ) => {
			if ( ! ownerNode.getAttribute( 'data-emotion' ) ) {
				root.appendChild( ownerNode.cloneNode( true ) );
			}
		} );
		setShadow( root );

		function onFocusIn() {
			setHasFocus( true );
		}

		function onFocusOut() {
			setHasFocus( false );
		}

		root.addEventListener( 'focusin', onFocusIn );
		root.addEventListener( 'focusout', onFocusOut );
		return () => {
			root.addEventListener( 'focusin', onFocusIn );
			root.addEventListener( 'focusout', onFocusOut );
		};
	}, [] );
	return (
		<div
			ref={ ref }
			style={ { width: '100%' } }
			tabIndex={ 0 }
			aria-label={ label }
			role="button"
			onKeyDown={ ( event ) => {
				if ( event.keyCode === ENTER || event.keyCode === SPACE ) {
					focus.focusable.find( shadow )[ 0 ].focus();
					event.preventDefault();
				} else if ( event.keyCode === ESCAPE ) {
					shadow.host.focus();
					event.preventDefault();
					event.stopPropagation();
				}
			} }
			aria-pressed={ hasFocus }
		>
			{ shadow &&
				createPortal(
					<StyleProvider document={ { head: shadow } }>
						{ children }
					</StyleProvider>,
					shadow
				) }
		</div>
	);
}

/**
 * Renders a placeholder. Normally used by blocks to render their empty state.
 *
 * @param {Object}    props                The component props.
 * @param {WPIcon}    props.icon           An icon rendered before the label.
 * @param {WPElement} props.children       Children to be rendered.
 * @param {string}    props.label          Title of the placeholder.
 * @param {string}    props.instructions   Instructions of the placeholder.
 * @param {string}    props.className      Class to set on the container div.
 * @param {Object}    props.notices        A rendered notices list.
 * @param {Object}    props.preview        Preview to be rendered in the placeholder.
 * @param {boolean}   props.isColumnLayout Whether a column layout should be used.
 *
 * @return {Object} The rendered placeholder.
 */
function Placeholder( {
	icon,
	children,
	label,
	instructions,
	className,
	notices,
	preview,
	isColumnLayout,
	...additionalProps
} ) {
	const [ resizeListener, { width } ] = useResizeObserver();

	// Since `useResizeObserver` will report a width of `null` until after the
	// first render, avoid applying any modifier classes until width is known.
	let modifierClassNames;
	if ( typeof width === 'number' ) {
		modifierClassNames = {
			'is-large': width >= 480,
			'is-medium': width >= 160 && width < 480,
			'is-small': width < 160,
		};
	}

	const classes = classnames(
		'components-placeholder',
		className,
		modifierClassNames
	);
	const fieldsetClasses = classnames( 'components-placeholder__fieldset', {
		'is-column-layout': isColumnLayout,
	} );
	return (
		<AdminShadow label={ label }>
			<div
				{ ...additionalProps }
				className={ classes }
				role="dialog"
				aria-label={ label }
				ref={ useConstrainedTabbing() }
			>
				{ resizeListener }
				{ notices }
				{ preview && (
					<div className="components-placeholder__preview">
						{ preview }
					</div>
				) }
				<div className="components-placeholder__label">
					<Icon icon={ icon } />
					{ label }
				</div>
				{ !! instructions && (
					<div className="components-placeholder__instructions">
						{ instructions }
					</div>
				) }
				<div className={ fieldsetClasses }>{ children }</div>
			</div>
		</AdminShadow>
	);
}

export default Placeholder;
