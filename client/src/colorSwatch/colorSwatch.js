import React, { Component } from 'react';
import {Panel, Row, Col} from 'react-bootstrap';

// pass in a color and height. get a  responsive swatch with its name.

export class ColorSwatch extends Component {
    handleClick(e){
        this.props.selectColor(this.props.color)
    }
    render() {
        return (<Panel className="color-swatch-box" style={{height: this.props.swatchHeight}} onClick={this.handleClick.bind(this)}>

        <Row className="color-section">
            <Col className="panel-content" xs={12} style={{backgroundColor: this.props.color}}></Col>
        </Row>
        <Row className="name-section">
            <Col xs={12} className="panel-content">
                <div className="text-center panel-text">{this.props.color}</div>
            </Col>
        </Row>

        </Panel>);
    }
}

