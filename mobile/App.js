import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LoginPage } from './src/pages/login/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './src/pages/course/Home';
import { AuthProvider, useAuthValues } from './src/context/auth.context';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import { CoursePage } from './src/pages/course/Course';
import { CourseEditPage } from './src/pages/course/CourseForm';
import { LoadingProvider } from './src/context/loading.context';

const Stack = createNativeStackNavigator();

const ContainerStack = () => {
  const [auth, setAuth] = useState(false);
  const { token, isAuthenticated, setIsAuthenticated, logout, isAdmin } = useAuthValues();
  
  useEffect(() => {
    if (token !== "" && isAuthenticated) setAuth(true);
    else setAuth(false)
  }, [token, isAuthenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!auth ? (
          <Stack.Screen name="login" component={LoginPage} options={{headerShown: false}} />
          ) :(
          <>
            <Stack.Screen 
              name="home" 
              component={HomePage} 
              options={({ navigation }) => ({ 
                title: 'Dashboard',
                animationTypeForReplace: auth ? 'pop' : 'push', 
                headerStyle: {
                  backgroundColor: '#783F8E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: (props) => (
                  <>
                    <TouchableOpacity onPress={() => {logout(); setIsAuthenticated(false); }}>
                      <FontAwesomeIcon name="sign-out" size={25} color="#FFF" />
                    </TouchableOpacity>
                    {isAdmin && (
                      <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => { navigation.navigate('course-create') }}>
                        <FontAwesomeIcon name="plus" size={25} color="#FFF" />
                      </TouchableOpacity>
                    )}
                  </>
                ),
              })} 
            />
            <Stack.Screen 
              name="course" 
              component={CoursePage}
              options={{ 
                title: 'Detalhes do Curso',
                animationTypeForReplace: auth ? 'pop' : 'push', 
                headerStyle: {
                  backgroundColor: '#783F8E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}  
            />
            <Stack.Screen 
              name="course-edit" 
              component={CourseEditPage}
              options={({ navigation, route }) => ({ 
                title: `Editando Curso ${route.params}`,
                animationTypeForReplace: auth ? 'pop' : 'push', 
                headerStyle: {
                  backgroundColor: '#783F8E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}  
            />
            <Stack.Screen 
              name="course-create" 
              component={CourseEditPage}
              options={({ navigation, route }) => ({ 
                title: `Criar Curso`,
                animationTypeForReplace: auth ? 'pop' : 'push', 
                headerStyle: {
                  backgroundColor: '#783F8E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}  
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ContainerStack />
      </AuthProvider>
    </LoadingProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
