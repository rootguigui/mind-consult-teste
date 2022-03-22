import { StyleSheet } from 'react-native'
import { colors, constants } from '../../helpers'

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    height: 45
  },
  input: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 8,
    borderColor: colors.light_gray,
    borderWidth: 1,
  },
  textButton: {
    color: colors.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'left',
    width: constants.width - 10,
  },
  textDesc: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 5,
    textAlign: 'left'
  },
  cardInfo: {
    width: constants.width - 10,
    borderRadius: constants.br_5,
    padding: 10,
    backgroundColor: colors.light_white,
  },
  textInfo: {
    fontWeight: '100'
  },
  button: {
    height: 35,
    backgroundColor: colors.primary,
    paddingHorizontal: 10, 
    paddingVertical: 5,
    marginHorizontal: 10,
    width: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonContainer: {
    paddingVertical: 10,
    flexDirection: 'row', 
    marginTop: 20, 
    width: '100%', 
    justifyContent: 'center' 
  },
  input: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 8,
    borderColor: '#c1c1c1',
    borderWidth: 1,
    marginBottom: 10
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 2
  },
  containerHome: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginVertical: 5,
    backgroundColor: '#E0DFF1',
    marginHorizontal: 15,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10
  }
})