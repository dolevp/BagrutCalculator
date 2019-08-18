import React from 'react';
import { Text, View } from 'react-native';
import { Picker, Button } from 'native-base';
import style from './style';

const bagrutReqJson = require("../../data/bagrutReqs.json")

export default class TopBar extends React.Component {

constructor(props){
  super(props);
  this.state = {

  }
}

renderSectorButton = (sectorName) => {
  return (
    <Button style={style.sectorButton}>
      <Text style={style.btnText}>
        {sectorName}
      </Text>
    </Button>
  )
}

  render(){

    return (

      <View style={style.container}>
        <View style={style.textContainer}>
          <Text style={style.sectorText}>
            בחר תבנית תעודת בגרות 
          </Text>
        </View>
        <View style={style.buttonContainer}>
          {Object.keys(bagrutReqJson.requirements).map((sectorName) => this.renderSectorButton(sectorName))}
        </View>
      </View>

    );
  }
}
