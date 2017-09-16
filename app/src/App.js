import React, { Component } from 'react';
import './styles/mainStyle.scss';
import {Col, Grid} from 'react-bootstrap'
import {ColorSwatch} from './colorSwatch/colorSwatch';
class App extends Component {
  render() {
    return (
      <Grid className="App">
        <Col xs={2}>
          <ColorSwatch color="pink" swatchHeight='125px'/>
        </Col>
      </Grid>
    );
  }
}

export default App;
