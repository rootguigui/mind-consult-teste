import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { useAuthValues } from '../../context/auth.context';
import { baseUrl } from '../../services/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import { useLoadingValues } from '../../context/loading.context';
import { styles } from './styles';

export const LoginPage = ({ navigation }) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const { setIsAuthenticated, setToken, setIsAdmin } = useAuthValues();
  const { loading, setLoading } = useLoadingValues();

  const onChangeText = (e, name) => {
    setUser(pvt => {
      return { ...pvt, [name]: e }
    })
  } 

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessage(null)
    try {
      const result = await baseUrl.post('api/user/login', user);
      try {
        await AsyncStorage.setItem('token', result.data.data.token);
        await AsyncStorage.setItem('isAdmin', result.data.data.isAdmin.toString());
      }
      catch(er) { console.log(er)}

      setErrorMessage(null);
      setIsAuthenticated(true);
      setToken(result.data.data.token);

      if (result.data.data.isAdmin) setIsAdmin(true);
      else setIsAdmin(false);

      setTimeout(() => {navigation.replace('home'); setLoading(false)}, 1000);
    }
    catch(ex) { 
      const { response } = ex;
      if (response.data) {
        setErrorMessage(response.data.message)
      }
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        <FontAwesomeIcon name="book" size={100} color="#783F8E" />
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#783F8E'}}>Catalogo de Cursos</Text>
      </View>
      <View>
        <TextInput
          style={{...styles.input, ...{ marginBottom: 5 }}}
          onChangeText={e => onChangeText(e, 'email')}
          value={user.email}
          placeholder="insira o e-mail"
          autoCapitalize='none'
          />
        <TextInput
          style={styles.input}
          onChangeText={e => onChangeText(e, 'password')}
          value={user.password}
          placeholder="insira a senha"
          autoCapitalize='none'
        />
        {errorMessage && <Text style={styles.dangerText}>{errorMessage}</Text>}
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={onSubmit}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.textButtonSubmit}>ENTRAR</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

