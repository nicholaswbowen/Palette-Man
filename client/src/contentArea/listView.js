import React, { Component } from 'react';
import {Col, Pagination} from 'react-bootstrap';
import {ColorSwatch} from '../colorSwatch/colorSwatch'

export class ListView extends Component {
    render() {
        return (<div className='site-content'>
                {this.props.activeColorsPage.colors.map((color,index) => {
                    return <Col xs={6} md={3} lg={2} key={color._id}>
                        <ColorSwatch swatchHeight='125px' color={color.x11Name || color.hex} selectColor={this.props.selectColor}/>
                    </Col>
                })}
                <Pagination
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.allPages.length+1}
                    maxButtons={10}
                    activePage={this.props.activeColorsPage.index}
                    onSelect={this.handleSelect.bind(this)}
                     />
        </div>);
    }
    handleSelect(key){
        this.props.selectPage(key-1)
    }
}

