import { StyleSheet } from 'react-native';

const pink = '#FC3C7D'
const lime = '#EEFF41'

const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: lime,

  },
  textContainer: {

    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sectorText: {
    color: '#212121',
    fontSize: 20,
    marginBottom: '3%',

  },
  buttonContainer: {

    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  sectorButton: {

    backgroundColor: 'white',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {

    color: pink,
    fontWeight: 'bold',
  },
})

export default style;
