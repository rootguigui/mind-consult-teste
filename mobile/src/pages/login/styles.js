import { StyleSheet } from 'react-native';
import { colors, constants } from '../../helpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignContent: 'center'
  },
  input: {
    height: 50,
    marginLeft: constants.m_10,
    marginRight: constants.m_10,
    borderRadius: constants.br_5,
    paddingLeft: 8,
    borderColor: colors.light_gray,
    borderWidth: 1,
    marginBottom: constants.m_10
  },
  buttonSubmit: {
    height: 50,
    marginVertical: constants.m_10,
    marginHorizontal: constants.m_10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: constants.br_5,
  },
  textButtonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  dangerText: {
    color: 'red',
    fontSize: constants.fontSize,
    textAlign: 'center'
  }
});