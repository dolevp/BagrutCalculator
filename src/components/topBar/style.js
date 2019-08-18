import { StyleSheet } from 'react-native';

const pink = '#FC3C7D'
const lime = '#EEFF41'

const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: pink,

  },
  textContainer: {

    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sectorText: {
    color: 'white',
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
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '15%'
  },

  btnText: {

    color: '#757575',
    fontWeight: 'bold',
    paddingHorizontal: '1%',
  },
})

export default style;
