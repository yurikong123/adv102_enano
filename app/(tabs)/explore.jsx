import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('/');
  };

  const LoginForm = () => {
    navigation.navigate('LoginForm');
  };

  const Exercise4 = () => {
    navigation.navigate('Exercise4');
  };

  const Exercise5 = () => {
    navigation.navigate('Exercise5');
  };

  const Exercise6 = () => {
    navigation.navigate('Exercise6');
  };

  const Exercise7 = () => {
    navigation.navigate('Exercise7');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>Exercises</ThemedText>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.card} onPress={LoginForm}>
          <ThemedText type="defaultSemiBold">Exercise 3</ThemedText>
          <ThemedText type="default">Create login screen</ThemedText>
          <ThemedText type="default">Login screen fields</ThemedText>
          <ThemedText type="default">{'\u2022'} Email</ThemedText>
          <ThemedText type="default">{'\u2022'} Password</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={Exercise4}>
          <ThemedText type="defaultSemiBold">Exercise 4</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={Exercise5}>
          <ThemedText type="defaultSemiBold">Exercise 5</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={Exercise6}>
          <ThemedText type="defaultSemiBold">Exercise 6</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={Exercise7}>
          <ThemedText type="defaultSemiBold">Exercise 7</ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    alignItems: 'flex-start',
    zIndex: 1, 
    elevation: 4,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  scrollViewContent: {
    paddingTop: 15,
    padding: 20,
  },

  card: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
});