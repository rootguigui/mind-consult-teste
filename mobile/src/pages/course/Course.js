import React, { useEffect, useState }  from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useAuthValues } from '../../context/auth.context';
import { baseUrl, url } from '../../services/base';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import { useLoadingValues } from '../../context/loading.context';
import { colors } from '../../helpers';
import { styles } from './styles';

export const CoursePage = ({ navigation, route }) => {
  const { isAdmin, token } = useAuthValues();
  const [course, setCourse] = useState(route.parms);
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, setLoading } = useLoadingValues();

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async() => {
    setLoading(true);
    const { data } = await baseUrl.get(`api/course/${route.params._id}`, { headers: { authorization: `Bearer ${token}`}});
    const { course } = data.data;
    setCourse(course);
    setLoading(false);
  }

  const deleteCourse = async (id) => {
    setLoading(true);
    await baseUrl.delete(`api/course/delete/${id}`, { headers: { authorization: `Bearer ${token}` }});
    setTimeout(() => { navigation.goBack(); setLoading(false); }, 1000);
  }
  
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loading ? <ActivityIndicator size="large" color={colors.primary} /> : (
        <View style={{ flex: 1, alignItems: 'center'}}>
          {course && (
            <>
              <Image 
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width - 50 }}
                source={{
                  uri: `${url}images/${course.image}`,
                }}/>
              <View>
                <Text style={styles.textTitle}>{course.name}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.textDesc}>Descrição do curso: <Text style={styles.textInfo}>{course.description}</Text></Text>
                <Text style={styles.textDesc}>Categoria: <Text style={styles.textInfo}>{course.category}</Text></Text>
                <Text style={styles.textDesc}>Professor responsavel: <Text style={styles.textInfo}>{course.author}</Text></Text>
                {isAdmin && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('course-edit', course._id)}>
                      <FontAwesomeIcon name="edit" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => deleteCourse(course._id)}>
                      <FontAwesomeIcon name="trash" size={25} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}