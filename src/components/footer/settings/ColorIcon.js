import React from 'react';

export default ({color, onClick, dbColor, selectedColor}) => {
	let theColor = () => {
		if (!selectedColor) {
			return dbColor;
		} else {
			return selectedColor;
		}
			
	}
	return (
		<div style={{display: "inline", padding: 0,}}>
			{ (theColor() === color) &&
				<i 
					className="fa fa-child fa-2x" 
					style={{
							color, 
							marginLeft: 5 + "px", 
							marginRight: 5 + "px", 
							cursor: "pointer",
							width: 30 + "px"

						}}
					onClick={() => onClick(color)}
				/>

			}
			{ theColor() !== color  &&
				<i 
					className="fa fa-circle fa-2x" 
					style={{
							color, 
							marginLeft: 5 + "px", 
							marginRight: 5 + "px", 
							cursor: "pointer",
							width: 30 + "px"
						}}
					onClick={() => onClick(color)}
				/>
			}
			</div>
	)
}
