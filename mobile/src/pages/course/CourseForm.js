import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useAuthValues } from '../../context/auth.context';
import { baseUrl, url } from '../../services/base';
import * as ImagePicker from 'expo-image-picker';
import { useLoadingValues } from '../../context/loading.context';
import { colors } from '../../helpers';
import { styles } from './styles';

export const CourseEditPage = ({ navigation, route }) => {
  const { token } = useAuthValues();
  const [course, setCourse] = useState(null);
  const [image, setImage] = useState(null);
  const { loading, setLoading } = useLoadingValues();

  useEffect(() => {  if (route.params != null) getCursoById(); }, [route.params]);

  const getCursoById = async () => {
    const { data } = await baseUrl.get(`api/course/${route.params}`, { headers: { authorization: `Bearer ${token}`}});
    const { course } = data.data;
    setCourse(course);
    setImage({ uri: `${url}images/${course.image}` });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  }

  const onChangeText = (e, name) => {
    setCourse(pvt => {
      return { ...pvt, [name]: e }
    })
  } 

  const onSubmit = async () => {
    setLoading(true)
    var formData = new FormData();
    formData.append('image', {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'});
    formData.append('category', course.category);
    formData.append('_id', route.params);
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('author', course.author);

    const endpoint = route.params == null ? `${url}api/course/create` : `${url}api/course/update`;
    
    await fetch(endpoint, {
      method: 'post',
      headers: { authorization: `Bearer ${token}`, },
      body: formData
    });
    
    setTimeout(() => { navigation.goBack(); setLoading(false) }, 1000);
  } 

  return (
    <View>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.textButton}>Selecionar Image</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          {image && <Image source={{ uri: image.uri }} style={{ width: Dimensions.get('window').width - 20, height: 400 }} />}
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft:15, marginTop: 5 }}>Nome</Text>
          <TextInput
              style={styles.input}
              onChangeText={e => onChangeText(e, 'name')}
              value={course && course.name}
              placeholder="Nome do Curso"
              autoCapitalize='none'
            />
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft:15, marginTop: 5 }}>Descrição</Text>
          <TextInput
              style={styles.input}
              onChangeText={e => onChangeText(e, 'description')}
              value={course && course.description}
              placeholder="Descrição do curso"
              autoCapitalize='none'
            />
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft:15, marginTop: 5 }}>Categoria</Text>
          <TextInput
              style={styles.input}
              onChangeText={e => onChangeText(e, 'category')}
              value={course && course.category}
              placeholder="Categoria do curso"
              autoCapitalize='none'
            />
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft:15, marginTop: 5 }}>Professor Responsavel</Text>
          <TextInput
              style={styles.input}
              onChangeText={e => onChangeText(e, 'author')}
              value={course && course.author}
              placeholder="Professor Responsavel"
              autoCapitalize='none'
            />
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          {loading ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.textButton}>Salvar Edição</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
