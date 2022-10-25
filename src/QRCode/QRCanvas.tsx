'use strict';
import * as React from 'react'
import qrcodegen from './lib/qrcodegen';
import { IPropsCanvas } from './types';
import { View,Platform } from 'react-native';
import {WebView} from 'react-native-webview'
interface IState {
    codeValue: string
    size: number
    margin: number
    errorCorrectLevel: 'L' | 'M' | 'Q' | 'H'
    fgColor: string
    bgColor: string
}
export default class QRCanvas extends React.PureComponent<IPropsCanvas,IState>{
    constructor(props: IPropsCanvas) {
        super(props);
        this.state = {
            codeValue: props.codeValue,
            size: props.size || 128,
            margin: props.margin || 4,
            errorCorrectLevel: props.errorCorrectLevel || 'L',
            fgColor: props.fgColor||'#000000',
            bgColor: props.bgColor||'#FFFFFF',

        }
    }

    render() {
        var qr = qrcodegen(0, this.state.errorCorrectLevel);
        qr.addData(this.state.codeValue);
        qr.make();
        var module = qr.getModules();
        const contextString = JSON.stringify({
            size:this.state.size,
            fgColor:this.state.fgColor,
            bgColor:this.state.bgColor,
            margin:this.state.margin,
            module
        });
        return (
            <View style={{width:this.state.size,height:this.state.size}}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={Platform.OS === 'android'}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    opaque={false}
                    underlayColor={'transparent'}
                    style={{width:this.state.size,height:this.state.size}}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    onLoad={()=>{}}
                    onLoadEnd={()=>{}}
                    originWhitelist={['*']}
                    source={{html: `<style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style>
                    <canvas id = 'canvasCode'></canvas>
                    <script>
                    renderCanvas(${contextString});
                    function renderCanvas(obj){
                        // size,margin,fgColor,bgColor,module
                        var canvas = document.getElementById('canvasCode');
                        var ctx = canvas.getContext('2d');
                        canvas.width = obj.size;
                        canvas.height = obj.size;
                        var length = obj.module.length;
                        var cellsize = (obj.size - obj.margin * 2) / length;
                        for (var row = 0; row < length; row++) {
                            for (var col = 0; col < length; col++) {
                                ctx.fillStyle = obj.module[row][col] ? obj.fgColor : obj.bgColor;
                                ctx.fillRect(row * cellsize+obj.margin, col * cellsize+obj.margin, cellsize, cellsize);
                            }
                        }
                    }
                    </script>`}}
                />
            </View>
        );
    }
}