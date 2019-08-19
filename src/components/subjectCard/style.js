import { StyleSheet, I18nManager } from 'react-native';
import React from 'react';

//COLORS
const secondaryTextColor = '#757575'
const gradeViewDir = I18nManager.isRTL ? 'row' : 'row-reverse'

const style = StyleSheet.create({

  subjectNameText: {
    color: secondaryTextColor,
    fontSize: 20

  },
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end'

  },
  gradeText: {

    color: secondaryTextColor,
    fontSize: 18,
  },
  unitText: {
    color: secondaryTextColor,
    textAlign: 'center',
    fontSize: 16,

  },
  unitView: {
    flex: 1,
    alignItems: 'center',

  },
  splitText: {
    margin: '3%',
    color: secondaryTextColor,
    fontSize: 14,
  },
  left: {
    marginEnd:'2%',

  },
  right: {
    marginStart: '2%',
  },
  gradeView: {
    width: '100%',
    height: '50%',
    flex: 1,
    flexDirection: gradeViewDir,
    backgroundColor: '#EEFF41',

  },
  gradeSplitBigView: {

    flex: 1,


  },
  gradeSplitMiniView: {

    flex: 1,


  },
  finalGradeView: {

    flex: 1,


  },



});

export default style;
