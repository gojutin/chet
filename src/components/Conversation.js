import React, { Component } from 'react';
import 'react-dots-loader/index.css';
import { Row, Col } from 'reactstrap';

// Components
import Bubble from './Bubble';

export default class Conversation extends Component {

  render() {
    const { thisConversation, delayConversation, responseId, delay, name } = this.props;

    return (
      <div>

        { thisConversation && delayConversation &&
          <div>
            { thisConversation.exchanges.map(exchange => (
                <div
                  key={exchange.createdAt}
                  style={{ fontFamily: "Comfortaa, sans-serif" }}
                >
                  <Row>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                      {exchange.chetSays.id === responseId &&
                        <Bubble
                            message={exchange.chetSays.term}
                            type="response"
                            delay={delay}
                            name={name}
                          />
                      }

                      {exchange.chetSays.id !== responseId &&
                        
                          <Bubble
                            textColor="white"
                            type="chet"
                            message={exchange.chetSays.term}
                          />
                        
                      }
                    </Col>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                      
                        <Bubble
                          message={exchange.userSays.term}
                          type="user"
                        />
                     
                    </Col>
                  </Row>
                </div>
              
            ))}
          </div>
        }
        
      </div>
    );
  }
}
