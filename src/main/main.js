import React from 'react';
import { Container, Content } from 'native-base';
import { View } from 'react-native';
import SubjectCard from '../components/subjectCard';
import TopBar from '../components/topBar';
import style from './style.js';

export default function Main() {

  return (

      <Container style={style.container}>
        <View style={{flex: 2}}>
        <TopBar/>
        </View>
        <View style={{flex: 8}}>
        <Content>
          <SubjectCard subjectName="מתמטיקה" units={5} splitSubject={false}/>
        </Content>
        </View>
      </Container>
  );

}
