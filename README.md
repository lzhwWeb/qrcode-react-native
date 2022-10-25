# qrcode-react-native
A react-native component to generate QRcode,you can use Image or Canvas.It can use with react-native-web too;
## Installation
```sh
npm install qrcode-react-native --save
```
## Usage
```js
'use strict';
import React from "react";
import { SafeAreaView, Text } from "react-native";

import { QRCodeImg, QRCanvas } from "qrcode-react-native";
export default class App extends React.Component {
  state = {
    codeValue: "http://facebook.github.io/react-native/",
    size: 128,
    fgColor: "#000000",
    bgColor: "#ffffff",
  };

  render() {
    return (
      <SafeAreaView>
        <QRCodeImg
          codeValue={this.state.codeValue}
          size={this.state.size}
          errorCorrectLevel="L"
        />
        <QRCanvas codeValue={this.state.codeValue}
          size={this.state.size}
          errorCorrectLevel='L'
          fgColor={this.state.fgColor}
          bgColor={this.state.bgColor} />
        <Text>{this.state.codeValue}</Text>
      </SafeAreaView>
    );
  }
}
```
## Available Props

##### QRCodeImg
prop      | type                 | default value
----------|----------------------|--------------
`value`   | `string`             | ` `
`size`    | `number`             | `128`
`errorCorrectLevel` | `string`('L','M','Q','H') | `L`

##### QRCanvas
prop      | type                 | default value
----------|----------------------|--------------
`value`   | `string`             | ` `
`size`    | `number`             | `128`
`bgColor` | `string` (CSS color) | `"#000"`
`fgColor` | `string` (CSS color) | `"#FFF"`
`errorCorrectLevel` | `string`('L','M','Q','H') | `L`

>warning: QRCanvas need react-native-webview

# Licenses

All source code is licensed under the [MIT License](https://github.com/lzhwWeb/qrcode-react-native/blob/main/LICENSE).
