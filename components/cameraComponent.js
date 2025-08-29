import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent({ onFaceDetected }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState('front'); // Usamos string en lugar de Constants
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  // Manejar el caso cuando Camera no está disponible
  if (!Camera || !Camera.Constants) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error: Cámara no disponible</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onFaceDetected(true)}
        >
          <Text style={styles.buttonText}>Simular reconocimiento</Text>
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
  
  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text>No se tiene acceso a la cámara</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onFaceDetected(true)}
        >
          <Text style={styles.buttonText}>Continuar sin cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={cameraType}
        ref={cameraRef}
        onFacesDetected={({ faces }) => {
          if (faces.length > 0) {
            setTimeout(() => {
              onFaceDetected(true);
            }, 2000);
          }
        }}
        faceDetectorSettings={{
          mode: 'fast',
          detectLandmarks: 'none',
          runClassifications: 'none',
          minDetectionInterval: 1000,
          tracking: true,
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCameraType(
                cameraType === 'back' ? 'front' : 'back'
              );
            }}>
            <Text style={styles.text}> Voltear cámara </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.overlay}>
          <View style={styles.faceFrame}>
            <Text style={styles.instruction}>Coloque su rostro dentro del marco</Text>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  camera: {
    flex: 1,
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
    marginTop: 10,
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
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});