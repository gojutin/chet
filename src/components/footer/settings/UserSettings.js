import React, { Component } from 'react';
import {  Col, Row } from 'reactstrap';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';

import Pin from './Pin';

export default class UserSettings extends Component {
  
  state = {
    allowChet: true,
    allowWipe: true,
    allowLogout: true,
  }

  componentDidMount() {
    const { db } = this.props;
    this.setState({
      allowChet: db.allowChet,
      allowWipe: db.allowWipe,
      allowLogout: db.allowLogout,
    })
  }


  handleSettingsToggle = (e, option) => {
    const { saveSettings, db } = this.props;
    const stateName = option.id;
    this.setState(prevState => ({
      [`${stateName}`]: !prevState[`${stateName}`]
    }), _ => {
      saveSettings(db.id,{[`${stateName}`]: this.state[`${stateName}`]});
    })
  }

  render () {
    const { db } = this.props;
    const { allowChet, allowWipe, allowLogout } = this.state;
    const settingsOptions = [
      { name: "Allow user to talk to Chet", id: "allowChet", value: allowChet },
      { name: "Allow user to wipe your chatbot's mind", id: "allowWipe", value: allowWipe },
      { name: "Allow user to logout (returns to Chet)", id: "allowLogout", value: allowLogout },
    ]

    return (
      <div>
        <br />
        <h4>Parental Settings</h4>
        { !db.enteredPin &&
          <div>
            { !db.pin &&
              <p>Please create a pin to get started</p>
            }
            { db.pin &&
              <p>Please enter your pin</p>
            }
            <Pin {...this.props} />
          </div>
        }
        { db.enteredPin &&
          <div>
          { settingsOptions.map(option => 
            <Row key={option.id}>
              <Col xs={12}>
                <hr />
                <p className="text-center">{option.name}</p>
                <Toggle
                  defaultChecked={this.props.db[option.id]}
                  checked={this.state[option.id]}
                  value={option.name}
                  onChange={(e) => this.handleSettingsToggle(e,option)}
                />
              </Col>
            </Row>
          )}
          </div>
        }
      </div>
    );
  }
}