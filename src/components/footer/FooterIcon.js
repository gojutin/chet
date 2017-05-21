import React from 'react';

export default ({type, condition, onClick, color, style}) =>
	 <i
			className={`fa fa-${type} fa-2x ${condition ? "text-warning" : ""}`}
			onClick={onClick ? () => onClick(): null}
			style={Object.assign({},{ color: "gray", cursor: "pointer" }, style )}
		/>