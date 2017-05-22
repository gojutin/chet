import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';


export default ( {toggleTab, tabNumber, activeTab, children} ) => {

	const tabClass = classNames({
		"active": tabNumber === activeTab
	})
	return (
		<NavItem>
			<NavLink
				className={tabClass}
				onClick={() => { toggleTab(tabNumber); }}
			>
				{children}
			</NavLink>
	</NavItem>
	);
}
