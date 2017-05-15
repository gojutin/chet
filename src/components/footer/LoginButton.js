import React, { Component } from 'react';
import { Dropdown, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SocialCircle from './SocialCircle';
import WobblySpinner from 'react-wobbly-spinner';

export default class LoginButton extends Component {
	state = {
		dropDownOpen: false,
		loggingIn: false,
	}

	toggle = () => {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }

	handleLogin = (network) => {
		this.setState({
				loggingIn: true
		})
		this.props.login(network).then(() => {
			this.setState({
				loggingIn: false
			})
		})
		this.toggle();
	}

	handleLogout = () => {
		this.props.logout().then(() => {
			this.toggle();
			if (this.props.babyChetMode) {
				this.props.handleBabyChet();
			}
			
		});
		
	}

	render() {
		const { userInfo } = this.props;
		const { dropDownOpen, loggingIn } = this.state;

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
					toggle={this.toggle}
					
				>
					<DropdownToggle style={dropdownStyle}  >
					{ loggingIn &&
						<WobblySpinner diameter={35} style={{ color: "gray", cursor: "pointer", fontSize: 1.8 + "em", marginTop: 5 + "px"}} />
					}
					{ !userInfo && !loggingIn &&
							<div
								style={{ display: "inline"}}
							>
							<i 
								className={`fa fa-user-circle-o fa-2x ${dropDownOpen ? "text-warning" : ""}`}
								style={{ color: "gray", cursor: "pointer", fontSize: 1.8 + "em", marginTop: 5 + "px"}}
							/>
							</div>
						
					}
			{ userInfo &&
							<div
								style={{
									display: "inline"
								}}
							>

								<img
									src={userInfo.photo}
									alt="Profile pic"
									height={35}
									style={{
										borderRadius: 50 + "%",
										border: "2px solid lightgray",
										marginBottom: 15 + "px",
										cursor: "pointer",

									}}
								/>

							</div>

					}
        
        </DropdownToggle>
        <DropdownMenu style={{border: userInfo ? "none" : "1px solid lightgray", background: userInfo ? "none" : "white"}}>
          
          { !userInfo &&
					<div className="text-center">
						<DropdownItem header className="text-center">Sign in with:</DropdownItem>
						<SocialCircle network="google" click={this.handleLogin} />
						<SocialCircle network="facebook" click={this.handleLogin} />
						<SocialCircle network="twitter" click={this.handleLogin} />
						<SocialCircle network="github" click={this.handleLogin}/>

					</div>
					}
					{ userInfo &&
						<Button
							className="text-center"
							onClick={() => this.handleLogout()}
							style={{cursor: "pointer", paddingTop: 10 + "px"}}
						>
							Logout
						</Button>
					}
        </DropdownMenu>
      </Dropdown>
			
				</div>
		);
	}
	
}