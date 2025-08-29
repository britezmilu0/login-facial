import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Camera from 'expo-camera';

export default function CameraComponent({ onFaceDetected }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState('front');

  useEffect(() => {
    (async () => {
      try {
        if (!Camera || !Camera.requestCameraPermissionsAsync) {
          console.log('Cámara no disponible en este entorno');
          setHasPermission(false);
          return;
        }

        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  if (Platform.OS === 'web' || hasPermission === false) {
    return (
      <View style={styles.cameraContainer}>
        <Text style={styles.cameraText}>Cámara simulada - Reconocimiento facial</Text>
        <Text style={styles.cameraText}>Enfoca tu rostro en el marco</Text>
        
        <View style={styles.faceFrame}>
          <Text style={styles.instruction}>Coloque su rostro dentro del marco</Text>
        </View>
        
        <TouchableOpacity
          style={styles.recognizeButton}
          onPress={() => {
            setTimeout(() => {
              onFaceDetected(true);
            }, 2000);
          }}
        >
          <Text style={styles.buttonText}>Iniciar reconocimiento facial</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onFaceDetected(false)}
        >
          <Text style={styles.buttonText}>Volver al login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text>Solicitando permiso para la cámara...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Camera.Camera 
        style={styles.camera} 
        type={cameraType}
        onFacesDetected={({ faces }) => {
          if (faces.length > 0) {
            setTimeout(() => {
              onFaceDetected(true);
            }, 2000);
          }
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //setCameraType(cameraType === 'back' ? 'front' : 'back');
            }}
          >
            <Text style={styles.text}>Voltear cámara</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.overlay}>
          <View style={styles.faceFrame}>
            <Text style={styles.instruction}>Coloque su rostro dentro del marco</Text>
          </View>
        </View>
      </Camera.Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  camera: {
    flex: 1,
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  faceFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});