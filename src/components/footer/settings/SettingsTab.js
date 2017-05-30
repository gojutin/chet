import React from 'react';
import { NavItem } from 'reactstrap';
import classNames from 'classnames';


export default ( {toggleTab, tabNumber, activeTab, children} ) => {

	const tabClass = classNames({
		"active text-warning": tabNumber === activeTab
	})
	return (
		<div className="nav-link">
			<NavItem
				className={tabClass}
				onClick={() => { toggleTab(tabNumber); }}
				style={{color: "lightgray"}}
			>
				{children}
			</NavItem>
	</div>
	);
}
