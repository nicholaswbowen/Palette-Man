import React, { Component } from 'react';
import './styles/mainStyle.scss';
import {ColorSwatch} from './colorSwatch/colorSwatch';
import {Button} from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ColorSwatch color='red' />
        <Button bsStyle='primary'>foo</Button>
        <Button bsStyle='danger'>bar</Button>
        <Button bsStyle='success'>baz</Button>

      </div>
    );
  }
}

export default App;
