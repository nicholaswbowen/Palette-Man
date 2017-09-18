import React, { Component} from 'react';
import {Panel} from 'react-bootstrap';

export class ColorPanel extends Component{
    render(){
        return(<div className="color-panel">
            <Panel onClick={this.handleClick.bind(this)}>
                <div className='color-name text-center'>{this.props.color}</div>
                <div className='tiny-swatch text-right' style={{backgroundColor: this.props.color}}></div>
            </Panel>
        </div>)
    }
    handleClick(e){
        this.props.selectColor(this.props.color)
    }
}