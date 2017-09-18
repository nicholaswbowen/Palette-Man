import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import {ListView} from './listView'
import {DetailsView} from './detailsView'

export class ContentArea extends Component {
    constructor(){
        super();
        this.state = {test: []}
    }
    componentDidMount(){
       
    }
    render() {
        return (<Col xs={12} md={9}>
        <br />
            {!this.props.selectedColor ? <ListView colorsList={this.props.randomColorsList} selectColor={this.props.selectColor}/> : null}  
            {this.props.selectedColor ? <DetailsView selectedColor={this.props.selectedColor} 
                                                     selectColor={this.props.selectColor} 
                                                     clearSelectedColor={this.props.clearSelectedColor}/> 
            : null} 
        </Col>);
    }
}

