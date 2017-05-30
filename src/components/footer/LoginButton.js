import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SocialCircle from './SocialCircle';
import WobblySpinner from 'react-wobbly-spinner';
import FooterIcon from './FooterIcon';

export default class LoginButton extends Component {
	state = {
		dropDownOpen: false,
	}

	toggleDropDown = () => {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }

	handleLogin = (network) => {
		const { profile, fetchPhrases, toggleBabyChetMode } = this.props;
		this.props.login(network)
		.then(uid => {
			console.log(uid)
			this.toggleDropDown();
			this.props.handleBabyChet(uid).then(() => {
				if ( profile.allowChet === false) {
					toggleBabyChetMode(false, profile.babyChetPhrasesId).then(dbref => {
						fetchPhrases(dbref, profile.babyChetChatId);
					})
					
					
				}
			})
		})
	}

	render() {
		const { profile } = this.props;
		const { dropDownOpen } = this.state;

		const dropdownStyle = {
			border: "none",
			margin: 0,
			padding: 0,
			background: "none",
		};

		return (
			<div>
				<Dropdown 
					className="dropup" 
					isOpen={dropDownOpen} 
					toggle={this.toggleDropDown}
					
				>
					<DropdownToggle style={dropdownStyle} aria-label="Login dropdown button"  >
					{ profile.loggingIn &&
						<WobblySpinner diameter={30} />
					}
					{ !profile.uid && !profile.loggingIn &&
							<div style={{ display: "inline"}}>
								<FooterIcon
									type="user-circle-o"
									condition={dropDownOpen}
								/>
							</div>
						
					}
        </DropdownToggle>
        <DropdownMenu 
					style={{
						border: "1px solid lightgray", 
						background: "white",
					}}
					className="text-center"
				>
					<div>
						<DropdownItem header>Sign in with:</DropdownItem>
						<SocialCircle network="google" click={this.handleLogin} />
						<SocialCircle network="facebook" click={this.handleLogin} />
						<SocialCircle network="twitter" click={this.handleLogin} />
						<SocialCircle network="github" click={this.handleLogin}/>

					</div>
					
        </DropdownMenu>
      </Dropdown>
			
				</div>
		);
	}
	
}