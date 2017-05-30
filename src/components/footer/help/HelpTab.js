import React from 'react';
import { NavItem } from 'reactstrap';

export default ( {toggleTab, tabNumber, activeTab, children} ) => 
	<div className="nav-link">
		<NavItem
			className={tabNumber === activeTab && "active"}
			onClick={() => { toggleTab(tabNumber) }}
		>
			{children}
		</NavItem>
</div>

