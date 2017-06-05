import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// components
import FooterIcon from './FooterIcon';
import SettingsModal from './settings/SettingsModal';
import HelpModal from './help/HelpModal';
import LoginModal from './LoginModal';

export default class Footer extends Component {

	state = {
		showHelpModal: false,
		showSettingsModal: false,
		showLoginModal: false,
		activeHelpTab: "1",
		dropDownOpen: false,
	}

	toggleDropDown = () => {
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen
		}));
	}

	toggleHelpModal = () => {
		this.setState(prevState => ({
			showHelpModal: !prevState.showHelpModal
		}), () => {
			if (!this.state.showModal) {
				this.setState({
					activeHelpTab: "1",
				})
			}
		})
	}

	toggleSettingsModal = () => {
		this.setState(prevState => ({
			showSettingsModal: !prevState.showSettingsModal
		}));
		if (this.props.profile.uid) {
			this.props.updateSettings(this.props.profile.uid, {enteredPin: false})
		}
		
	}

	toggleLoginModal = () => {
		this.setState(prevState => ({
			showLoginModal: !prevState.showLoginModal
		}));
	}

	handleLogin = (network) => {
		const { profile, toggleBabyChetMode, getInitialStats, babyChetPhrases } = this.props;
		this.props.login(network)
			.then(uid => {
				this.toggleLoginModal();
				this.props.handleBabyChet(uid).then(() => {
					if ( profile.allowChet === false) {
						toggleBabyChetMode(false, profile.babyChetPhrasesId);
					}
					getInitialStats(babyChetPhrases)
				})
			})
	}

	toggleHelpTabs = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeHelpTab: tab
			});
		}
	}

	render() {
		const {
			handleNightMode, nightMode, logout, deleteUserAccount,
			toggleChat, showChat, offline, babyChetPhrases, profile,
		} = this.props;

		const { showHelpModal, activeHelpTab, showLoginModal } = this.state;

		return (
			<div
				style={{
					position: "fixed",
					bottom: 0,
					height: 55 + "px",
					width: 100 + "%",
					padding: 10 + "px",
					color: nightMode ? "black" : "white",
				}}
				className={nightMode ? "bg-black" : "bg-white"}
			>
				<div style={{ paddingTop: 8 + "px" }}>
					<Row className="text-center">

						<Col
							xs={{ size: 3, offset: 0 }}
							md={{ size: 1, offset: 4 }}
						>

							{ !profile.uid &&
								<FooterIcon
									type="user-circle-o"
									condition={this.state.showLoginModal}
									onClick={this.toggleLoginModal}
									loggingIn={profile.loggingIn}
								/>
							}
							{ profile.uid &&
								<FooterIcon
									type="cog"
									condition={this.state.showSettingsModal}
									onClick={this.toggleSettingsModal}
								/>
							}

							{ showLoginModal &&
								<LoginModal
									offline={offline}
									toggleLoginModal={this.toggleLoginModal}
									showLoginModal={showLoginModal}
									handleLogin={this.handleLogin}
								/>
							}
							
							{ this.state.showSettingsModal &&
								<SettingsModal
									profile={profile}
									offline={offline}
									babyChetPhrases={babyChetPhrases}
									toggleBabyChetMode={this.props.toggleBabyChetMode}
									wipeBabyChetsMind={this.props.wipeBabyChetsMind}
									show={this.state.showSettingsModal}
									toggleSettingsModal={this.toggleSettingsModal}
									logout={logout}
									deleteUserAccount={deleteUserAccount}
									updateSettings={this.props.updateSettings}
								/>
							}
						</Col>
						<Col xs={3} md={1}>
							<FooterIcon
								type="tasks"
								condition={showChat}
								onClick={toggleChat}
							/>
						</Col>

						<Col xs={3} md={1} id="google">
							<FooterIcon
								type="moon-o"
								condition={nightMode}
								onClick={() => handleNightMode(nightMode)}
							/>
						</Col>

						<Col xs={3} md={1}>
							<FooterIcon
								type="question-circle-o"
								condition={showHelpModal}
								onClick={this.toggleHelpModal}
							/>
						
							{ showHelpModal &&
								<HelpModal
									showHelpModal={showHelpModal}
									toggleHelpModal={this.toggleHelpModal}
									activeHelpTab={activeHelpTab}
									toggleHelpTabs={this.toggleHelpTabs}
								/>
							}
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

