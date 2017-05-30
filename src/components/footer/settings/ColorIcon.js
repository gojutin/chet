import React from 'react';

export default ({color, dbColor, handleUpdateSettings}) => 
	<i 
		className={`fa fa-2x ${color === dbColor  ? "fa-child" : "fa-circle" }`}
		style={{
				color, 
				marginLeft: 5 + "px", 
				marginRight: 5 + "px", 
				cursor: "pointer",
				width: 30 + "px"
			}}
		onClick={() => handleUpdateSettings(color)}
	/>


