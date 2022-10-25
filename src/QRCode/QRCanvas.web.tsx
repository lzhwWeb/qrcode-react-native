'use strict';
import * as React from 'react'
import qrcodegen from './lib/qrcodegen';
import { IPropsCanvas } from './types';
interface IState {
    codeValue: string
    size: number
    margin: number
    errorCorrectLevel: 'L' | 'M' | 'Q' | 'H'
    fgColor: string
    bgColor: string
}
export default class QRCanvas extends React.PureComponent<IPropsCanvas, IState>{
    _canvas: HTMLCanvasElement | null | undefined;
    constructor(props: IPropsCanvas) {
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
    componentDidMount() {
        this.renderCanvas();
    }

    componentDidUpdate() {
        this.renderCanvas();
    }
    renderCanvas() {
        // size,margin,fgColor,bgColor,module
        if (this._canvas != null) {
            const qr = qrcodegen(0, this.state.errorCorrectLevel);
            qr.addData(this.state.codeValue);
            qr.make();
            const module = qr.getModules();
            const canvas = this._canvas;
            var ctx = canvas.getContext('2d');
            if (!ctx) {
                return;
            }
            canvas.width = this.state.size;
            canvas.height = this.state.size;
            const length = module.length;
            const cellsize = (this.state.size - this.state.margin * 2) / length;
            for (var row = 0; row < length; row++) {
                for (var col = 0; col < length; col++) {
                    ctx.fillStyle = module[row][col] ? this.state.fgColor : this.state.bgColor;
                    ctx.fillRect(row * cellsize + this.state.margin, col * cellsize + this.state.margin, cellsize, cellsize);
                }
            }
        }
    }
    render() {
        this.renderCanvas();
        return (
            <canvas
                style={{ height: this.state.size, width: this.state.size }}
                height={this.state.size}
                width={this.state.size}
                ref={(ref) =>
                    (this._canvas = ref)
                }
            />
        );
    }
}