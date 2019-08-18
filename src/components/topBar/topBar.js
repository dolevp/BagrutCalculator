import React from 'react';
import { Text, View } from 'react-native';
import { Picker, Button } from 'native-base';
import style from './style';

export default class TopBar extends React.Component {

constructor(props){
  super(props);
  this.state = {

  }
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
          <Button rounded style={style.sectorButton}>
            <Text style={style.btnText}>
              Hello
            </Text>
          </Button>
          <Button rounded style={style.sectorButton}>
            <Text style={style.btnText}>
              Hello
            </Text>
          </Button>
          <Button rounded style={style.sectorButton}>
            <Text style={style.btnText}>
              Hello
            </Text>
          </Button>
        </View>
      </View>

    );
  }
}
