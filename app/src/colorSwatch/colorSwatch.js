import React, { PureComponent } from 'react';
import {Well, Panel, Row, Col} from 'react-bootstrap';

// pass in a color and height. get a  responsive swatch with its name.

export class ColorSwatch extends PureComponent {
    render() {
        return (<Panel className="color-swatch-box" style={{height: this.props.swatchHeight}}>

        <Row style={{zIndex: 0}} className="color-section">
            <Col className="panel-content" xs={12} style={{backgroundColor: this.props.color}}></Col>
        </Row>
        <Row style={{zIndex: 1}} className="name-section">
            <Col xs={12} className="panel-content">
                <div className="text-center panel-text">{this.props.color}</div>
            </Col>
        </Row>

        </Panel>);
    }
}

