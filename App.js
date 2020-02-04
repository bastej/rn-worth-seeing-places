import React from 'react';
import { StyleSheet } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';

export default function App() {
  return (
    <PlacesNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
