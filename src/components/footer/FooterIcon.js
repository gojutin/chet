import React from 'react';

export default ({type, condition, onClick, color}) =>
	 <i
			className={`fa fa-${type} fa-2x ${condition ? "text-warning" : ""}`}
			onClick={() => onClick()}
			style={{ color: "gray", cursor: "pointer" }}
		/>