import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import CameraComponent from './../components/cameraComponent.js';

export default function LoginScreen({ navigation }) {
  const [showCamera, setShowCamera] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');

  const handleManualLogin = () => {
    Alert.alert('Éxito', 'Inicio de sesión manual exitoso');
    navigation.navigate('Dashboard');
  };

  const handleFacialLogin = (success) => {
    if (success) {
      Alert.alert('Éxito', 'Reconocimiento facial exitoso');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'No se pudo reconocer el rostro. Intente nuevamente.');
      setShowCamera(false);
    }
  };

  if (showCamera) {
    return <CameraComponent onFaceDetected={handleFacialLogin} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setLoginMethod('manual');
          handleManualLogin();
        }}
      >
        <Text style={styles.buttonText}>Ingresar con usuario/contraseña</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.buttonFacial}
        onPress={() => {
          if (Platform.OS === 'web') {
            Alert.alert('Simulación', 'En web se simula el reconocimiento facial');
            setTimeout(() => {
              navigation.navigate('Dashboard');
            }, 2000);
          } else {
            setLoginMethod('facial');
            setShowCamera(true);
          }
        }}
      >
        <Text style={styles.buttonText}>Reconocimiento Facial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#304c5fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonFacial: {
    backgroundColor: '#286642ff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});