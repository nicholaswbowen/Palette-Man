import React, { PureComponent } from 'react';

export class ColorSwatch extends PureComponent {
    render() {
        return (
            <div className="color-swatch-box">
                <div className="cs-body" style={{backgroundColor: this.props.color}}>foo</div>
                <div className="cs-title">{this.props.color}</div>
            </div>
        );
    }
}

