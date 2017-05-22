import React from 'react';
import { Col, Row } from 'reactstrap';

export default ({phase}) => 
	<div>
		<Row style={{color: "lightgray", marginTop: 20 + "px"}}>
		<Col xs={3} style={{color: phase === "toddler" ? "#ffbb33" : "lightgray"}} >
			<div>
				<i 
					className="fa fa-trophy fa-2x"
				/>
			</div>
			<p>toddler</p>
		</Col>									
		<Col xs={3}>
			<div>
				<i className="fa fa-trophy fa-2x" />
			</div>
			<p>kiddo</p>
		</Col>
		<Col xs={3}>
			<div>
				<i className="fa fa-trophy fa-2x" />
			</div>
			<p>teen</p>
			
		</Col>
		<Col xs={3}>
			<div>
				<i className="fa fa-trophy fa-2x" />
			</div>
			<p>adult</p>
			{/*<Badge style={{background: "lightgray"}}>new colors!</Badge>*/}
		</Col>
	</Row>
</div>