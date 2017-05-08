import React, { Component } from 'react';

import { Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class AgreementModal extends Component {

	state = {
		showModal: false,
		checkBox: false,
	}

	componentDidMount() {
		const cookie = this.props.cookies.get('hideModal')
		if (cookie !== "true") {
			this.toggleModal();
		}
	}

	toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }))
  }

	handleCookie = () => {
		const { cookies } = this.props;
		this.setState(prevState => ({
			checkBox: !prevState.checkBox
		}), () => {
			if (this.state.checkBox) {
				cookies.set('hideModal', true);
			} else {
				cookies.set('hideModal', false);
			}
		})
	}

	render() {
		const { showModal } = this.state;

		return (
			<Modal isOpen={showModal} className="text-center">
				<ModalBody>
					<h2>Hi, I'm Chet.</h2>
					<br />
					<h5>
						I learn from conversations and I don't always know what is inappropriate.
              </h5>
					<br />
					<h5>
						Please forgive me if I say anything to offend you.
              </h5>
				</ModalBody>

				<ModalFooter>
					<Button
						block
						size="lg"
						color="primary"
						onClick={this.toggleModal}
						style={{ cursor: "pointer" }}
					>
						It's okay, I understand!
              </Button>
				</ModalFooter>

				<div style={{ marginBottom: 10 + "px" }}>
					<Input type="checkbox" value="hi" onClick={this.handleCookie} />
					<span style={{ paddingLeft: 8 + "px" }}>Don't show this message again</span>
				</div>
			</Modal>
		)
	}
}