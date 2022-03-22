import React from 'react';
import {View, TextInput } from 'react-native';
import { styles } from '../pages/course/styles';

export const HomeSearchComponent = ({ setSearch, search }) => {
  return (
    <View style={{ marginTop: 10}}>
      <TextInput
        style={styles.input}
        onChangeText={e => setSearch(e)}
        value={search}
        placeholder="Pesquisar ....."
        autoCapitalize='none'
      />
   </View>
  );
}