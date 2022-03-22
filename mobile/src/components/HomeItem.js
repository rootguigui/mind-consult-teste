import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { styles } from '../pages/course/styles';
import { url } from '../services/base';

export const HomeItemComponent = ({ item, getCourses, setSearch, navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await getCourses();
    setSearch('');
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <TouchableOpacity onPress={() => navigation.navigate('course', item)}>
        <View style={styles.containerHome}>
          <View style={{ justifyContent: 'center'}}>
            <Image 
              style={{ width: 110, height: 100 }}
              source={{
                uri: `${url}images/${item.image}`,
            }}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start', alignContent: 'center', marginLeft: 10 }}>
            <Text style={styles.text}>Nome: <Text style={styles.textInfo}>{item.name}</Text></Text>
            <Text style={styles.text}>Descrição: <Text style={styles.textInfo}>{item.description}</Text></Text>
            <Text style={styles.text}>Categoria: <Text style={styles.textInfo}>{item.category}</Text></Text>
            <Text style={styles.text}>Prof. Resp.: <Text style={styles.textInfo}>{item.author}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}