import React from 'react';
import { Row, Col } from 'reactstrap';
import Loader from 'react-dots-loader';
import StatsModal from './StatsModal';

export default ({ message, children, type, name, response  }) => {

		const bubbleClass = () => {
			switch (type) {
				case "chet":
					return "speech-bubble-chet pull-right";
				case "response":
					return "speech-bubble-chet pull-right";
				case "user":
					return "speech-bubble-user";
				default:
					return "";
			}
		}
	return (
		<div className={bubbleClass()}>

			{response && !response.delay && type === "response" &&
				<div style={{padding: 14 + "px"}}>
					<Loader size={8} color="green" />
				</div>
			}

			{type !== "response" &&
				<Row>
					<Col xs={12}>
						<p style={{ color: type === "chet" ? "white" : "black", margin: 5,padding: 8 }}> {message} </p>
					</Col>
				</Row>
			}

			{response && response.delay && type === "response" &&
				<Row>
					<Col xs={10}>
						<p style={{ color: "white", margin: 5,padding: 8 }}> {message} </p>
					</Col>
						<Col xs={2}>
							<StatsModal name={name} />
						</Col>
				</Row>
			}
		</div>
	)

}


