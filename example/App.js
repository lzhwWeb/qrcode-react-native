import React from "react";
import { SafeAreaView, Text } from "react-native";

import { QRCodeImg } from "qrcode-react-native";
export default class App extends React.Component {
  state = {
    codeValue: "http://picturesofpeoplescanningqrcodes.tumblr.com/",
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
          fgColor={this.state.fgColor}
          bgColor={this.state.bgColor}
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
