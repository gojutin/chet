import React from 'react';
import { Col, Row } from 'reactstrap';

const Milestone = ({level, milestone}) => {
	const getColor = () => {
		if (milestone.level === level) {return "green"} else
		if (milestone.level < level) {return "#ffbb33"} else
		{return "lightgray"}
	}
	const getColumnSize = () => {
		switch(milestone.level) {
			case 1:
				return {size: 12}
			case 2:
				return {size: 4, offset: 2}
			case 3:
				return {size: 4}
			case 4:
				return {size: 4}
			case 5:
				return {size: 4}
			case 6:
				return {size: 4}
			default:
				break;
		}
	}
	const color = getColor();
	const colSize = getColumnSize();
	return (
		<Col 
			xs={colSize} 
			style={{color}}
		>
			<div>
				<i className="fa fa-trophy fa-2x" />
			</div>
			<p>{milestone.phase}</p>
		</Col>
	)
}

const milestones = [
	{level: 1, phase: "baby bot"},
	{level: 2, phase: "tot bot"},
	{level: 3, phase: "kid bot"},
	{level: 4, phase: "teen bot"},
	{level: 5, phase: "big bot"},
	{level: 6, phase: "grand bot"},
];

export default ({level}) => 
	<div>
		<Row style={{color: "lightgray", marginTop: 20 + "px"}}>
			{ milestones.map(milestone => (
				<Milestone key={milestone.level} level={level} milestone={milestone} />
			))}
	</Row>
</div>