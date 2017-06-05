import React, { Component } from 'react';
// import moment from 'moment';

import { Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import Privacy from './footer/help/Privacy';

export default class AgreementModal extends Component {

	state = {
		checkBox: false,
		showTerms: false,
	}

	toggleTerms = () => {
		this.setState(prevState => ({
			showTerms: !prevState.showTerms
		}))
	}

	handleAgreement = () => {
		let localStorage = window.localStorage;
		this.setState(prevState => ({
			checkBox: !prevState.checkBox
		}), () => {
			if (this.state.checkBox) {
				// const rightNow = moment().format('MMMM Do YYYY');
				const rightNow = new Date().toDateString();
				localStorage.setItem("chet", true);
				localStorage.setItem("time", rightNow);
			} else {
				localStorage.setItem("chet", false)
			}
		})
	}

	render() {
		const { showTerms, checkBox } = this.state;
		const { toggleAgreementModal, showAgreementModal } = this.props;

		return (
			<Modal isOpen={showAgreementModal} className="text-center scroll modal-shadow" style={{maxHeight: 90 + "%"}} >
				<ModalBody>
					<h2 style={{fontFamily: "Comfortaa, sans-serif"}}>
						Hi, I'm Chet.
					</h2>
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
						aria-label="Close popover button"
						disabled={!checkBox}
						onClick={() => toggleAgreementModal()}
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
						aria-label="Checkbox to agree to terms"
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
							privacy policy</span>.
					</p>
				</div>
				{showTerms &&
					<div>
						<hr />
						<Privacy />
					</div>
				}
			</Modal>
		)
	}
}