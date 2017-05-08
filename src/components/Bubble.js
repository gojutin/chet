import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Loader from 'react-dots-loader';
import InfoModal from './InfoModal';

export default ({ message, children, type, delay }) => {

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

			{!delay && type === "response" &&
				<div style={{ paddingBottom: 12 + "px" }}>
					<Loader size={8} color="green" />
				</div>
			}

			{!delay && type !== "response" &&
				<Row>
					<Col xs={12}>
						<p style={{ color: type === "chet" ? "white" : "black" }}> {message} </p>
					</Col>
				</Row>
			}

			{delay && type === "response" &&
				<Row>
					<Col xs={10}>
						<p style={{ color: "white" }}> {message} </p>
					</Col>
						<Col xs={2}>
							<InfoModal />
						</Col>
				</Row>
			}
		</div>
	)

}


