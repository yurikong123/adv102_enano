import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Permission to access media library is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onRegisterSubmit = async (data) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      let photoURL = '';

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imgRef = ref(storage, `profilePictures/${userCred.user.uid}.jpg`);
        await uploadBytes(imgRef, blob);
        photoURL = await getDownloadURL(imgRef);
      }

      await updateProfile(userCred.user, {
        displayName: data.name,
        photoURL,
      });

      Alert.alert('Success', 'Registered successfully');
      reset();
      setImage(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const onLoginSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Alert.alert('Success', 'Logged in successfully');
      reset();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const toggleMode = () => {
    reset();
    setImage(null);
    setIsRegister(!isRegister);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>

      <TouchableOpacity style={styles.switchBtn} onPress={toggleMode} activeOpacity={0.7}>
        <Text style={styles.switchText}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>

      {isRegister && (
        <>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#999"
              />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        </>
      )}

      <Text style={styles.label}>Email Address</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#999"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#999"
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {isRegister && (
        <>
          <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage} activeOpacity={0.7}>
            <Text style={styles.imagePickerText}>Pick a Profile Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        </>
      )}

      <TouchableOpacity
        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
        onPress={handleSubmit(isRegister ? onRegisterSubmit : onLoginSubmit)}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitBtnText}>{isRegister ? 'Register' : 'Login'}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f2f7ff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2a2a72',
    textAlign: 'center',
    marginBottom: 25,
  },
  switchBtn: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  switchText: {
    color: '#556bf7',
    fontWeight: '600',
  },
  label: {
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 14,
    color: '#222',
  },
  inputError: {
    borderColor: '#f44336',
  },
  error: {
    color: '#f44336',
    marginBottom: 10,
    marginLeft: 2,
  },
  imagePickerBtn: {
    backgroundColor: '#556bf7',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  imagePreview: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#556bf7',
  },
  submitBtn: {
    backgroundColor: '#2a2a72',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtnDisabled: {
    backgroundColor: '#999',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AuthForm;