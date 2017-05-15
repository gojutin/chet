import React, { Component } from 'react';
import moment from 'moment';

import { Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import Terms from './Terms';

export default class AgreementModal extends Component {

	state = {
		showModal: false,
		checkBox: false,
		showTerms: false,
	}

	componentDidMount() {
		if (localStorage.chet !== "true") {
			this.toggleModal();
		}
	}

	toggleModal = () => {
		this.setState(prevState => ({
			showModal: !prevState.showModal
		}))
	}

	toggleTerms = () => {
		this.setState(prevState => ({
			showTerms: !prevState.showTerms
		}))
	}

	handleAgreement = () => {
		this.setState(prevState => ({
			checkBox: !prevState.checkBox
		}), () => {
			if (this.state.checkBox) {
				const rightNow = moment().format('MMMM Do YYYY');
				localStorage.setItem("chet", true);
				localStorage.setItem("time", rightNow);
			} else {
				localStorage.setItem("chet", false)
			}
		})
	}

	render() {
		const { showModal, showTerms, checkBox } = this.state;

		return (
			<Modal isOpen={showModal} className="text-center scroll modal-shadow" style={{maxHeight: 90 + "vh"}} >
				<ModalBody>
					<h1 style={{ fontFamily: "Caveat Brush, monospace" }}>Hi, I'm Chet.</h1>
					<br />
					<p>
						I learn from conversations and don't always know what is inappropriate.
          </p>
					<p>
						Please forgive me if I say anything to offend you.
          </p>
				</ModalBody>

				<ModalFooter>
					<Button
						block
						size="lg"
						color="primary"
						disabled={!checkBox}
						onClick={this.toggleModal}
						style={{ 
							cursor: checkBox ? "pointer" : "not-allowed", 
							height: 100 + "%", 
							whiteSpace: "normal" }}
					>
						It's okay, Chet. I totally get it.
              </Button>
				</ModalFooter>

				<div style={{ marginBottom: 10 + "px", padding: 5 + "px"}}>
					<Input
						type="checkbox"
						value="hi"
						className="pull-left"
						onClick={this.handleAgreement}
						style={{ height: 20 + "px", width: 20 + "px" }}
					/>
					<p
						style={{
							paddingLeft: 8 + "px",
							display: "inline",
						}}
					>
						I agree to the
							<span
							className="text-primary"
							style={{ cursor: "pointer", paddingLeft: 5 + "px" }}
							onClick={this.toggleTerms}
						>
							terms &amp; conditions / privacy policy</span>.
					</p>
				</div>
				{showTerms &&
					<div>
						<hr />
						<Terms />
					</div>
				}
			</Modal>
		)
	}
}