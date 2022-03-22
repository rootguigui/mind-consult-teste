import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { HomeItemComponent } from '../../components/HomeItem';
import { HomeSearchComponent } from '../../components/HomeSearch';
import { useAuthValues } from '../../context/auth.context';
import { baseUrl } from '../../services/base';

export const HomePage = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const { token } = useAuthValues();

  useEffect(() => { getCourses() }, []);
  useEffect(() => { getCourses() }, [search]);
  useEffect(() => { 
    const unsubscribe = navigation.addListener('focus', async () => {
      await getCourses()
      setSearch('');
    });

    return unsubscribe; 
  }, [navigation]);
  
  const getCourses = async () => {
    try {
      const { data } = await baseUrl.get(`api/course?search=${search}`, { headers: { authorization: `Bearer ${token}`}});
      setCourses(data.data.courses);
    } catch(ex) {
      console.log(ex)
    }
  } 

  return(
    <>
      <HomeSearchComponent {...{ search, setSearch }} />
      <FlatList 
        keyExtractor={(item) => item._id}
        data={courses}
        renderItem={({ item }) => <HomeItemComponent {...{ item, getCourses, setSearch, navigation }} />}
      />
    </>
  );
};