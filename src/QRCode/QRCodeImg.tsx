'use strict';
import * as React from 'react'
import { Image } from 'react-native';
import qrcodegen from './lib/qrcodegen';
import { IPropsImg } from './types';
interface IState {
    codeValue: string
    size: number
    margin: number
    errorCorrectLevel: 'L' | 'M' | 'Q' | 'H'
    fgColor: string
    bgColor: string
}
export default class QRCodeImg extends React.PureComponent<IPropsImg, IState>{
    constructor(props: IPropsImg) {
        super(props);
        this.state = {
            codeValue: props.codeValue,
            size: props.size || 128,
            margin: props.margin || 4,
            errorCorrectLevel: props.errorCorrectLevel || 'L',
            fgColor: props.fgColor || '#000000',
            bgColor: props.bgColor || '#FFFFFF',
        }
    }

    render() {
        var qr = qrcodegen(0, this.state.errorCorrectLevel, this.state.fgColor, this.state.bgColor);
        qr.addData(this.state.codeValue);
        qr.make();
        var moduleCount = qr.getModuleCount();
        var cell = (this.state.size - this.state.margin * 2) / moduleCount;
        var imgBase64 = qr.createDataURL(cell, this.state.margin);
        return (
            <Image
                style={{ width: this.state.size, height: this.state.size }}
                source={{ uri: imgBase64 }}
            />
        );
    }
}
