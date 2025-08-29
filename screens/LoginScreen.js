import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import CameraComponent from './../components/cameraComponent';

export default function LoginScreen({ navigation }) {
  const [showCamera, setShowCamera] = useState(false);

  const handleManualLogin = () => {
    Alert.alert('Éxito', 'Inicio de sesión manual exitoso');
    navigation.navigate('Dashboard');
  };

  const handleFacialLogin = (success) => {
    if (success) {
      Alert.alert('Éxito', 'Reconocimiento facial exitoso');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'No se pudo reconocer el rostro');
      setShowCamera(false);
    }
  };

  // Si estamos en web, siempre usar simulación
  if (Platform.OS === 'web' && showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <Text style={styles.cameraText}>Cámara no disponible en web</Text>
        <Text style={styles.cameraText}>Usando simulación de reconocimiento facial</Text>
        
        <View style={styles.faceFrame}>
          <Text style={styles.instruction}>Simulación activa</Text>
        </View>
        
        <TouchableOpacity
          style={styles.recognizeButton}
          onPress={() => handleFacialLogin(true)}
        >
          <Text style={styles.buttonText}>Simular reconocimiento exitoso</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.buttonText}>Volver al login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showCamera) {
    return <CameraComponent onFaceDetected={handleFacialLogin} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleManualLogin}
      >
        <Text style={styles.buttonText}>Ingresar manualmente</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.buttonFacial}
        onPress={() => setShowCamera(true)}
      >
        <Text style={styles.buttonText}>Reconocimiento Facial</Text>
      </TouchableOpacity>
      
      {Platform.OS === 'web' && (
        <Text style={styles.note}>
          Nota: En la versión web se usa simulación de cámara
        </Text>
      )}
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonFacial: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  faceFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  instruction: {
    color: 'white',
    fontSize: 16,
  },
  recognizeButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});