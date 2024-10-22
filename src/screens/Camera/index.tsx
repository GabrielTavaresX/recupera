import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, BarcodeScanningResult } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Painel } from './styles';
import {  MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { Loading } from '../../components/Loading';

export function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
    const ref = useRef<CameraView>(null);
    const [photo, setPhoto] = useState<CameraCapturedPicture>();
    const [scanned, setScanned] = useState(false);
  
    if (!permission) {
      return <Loading />;
    }
  
    if (!permission.granted) {
      return (
        <View>
          <Text>Você precisa dar permissão para acesso à Câmera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
  
    async function takePicture() {
      if (ref.current) {
        const picture = await ref.current.takePictureAsync({ imageType: 'jpg', quality: 0 });
        setPhoto(picture);
      }
    }

    function handleBarcodeScanner({ data }: BarcodeScanningResult) {
      Alert.alert(data);
      setScanned(true);
    }

    if (photo) {
        return (
          
            <View style={Painel.container}>

                {scanned ? (
                  <>
                      <TouchableOpacity onPress={() =>{setScanned(false)}}>
                        <MaterialCommunityIcons onPress={() => {setScanned(false)}} style={Painel.icone} name='qrcode-scan' size={70}/>
                      </TouchableOpacity>
                  </>
                ) : (
                  <>
                  <TouchableOpacity onPress={toggleCameraFacing}>
                    <MaterialIcons style={Painel.icone}  name="flip-camera-android" size={70} />
                  </TouchableOpacity>
                

              <CameraView 
                  barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                  onBarcodeScanned={handleBarcodeScanner}  
                  style={Painel.image} 
                  facing={facing} 
                  ref={ref}>
              </CameraView>

             <TouchableOpacity onPress={takePicture}>
                <MaterialCommunityIcons style={Painel.icone} name='camera-iris' size={70}/>
              </TouchableOpacity>

              <Image style={Painel.image} source={{ uri: photo.uri }}></Image>
              </>
              )}
            </View>
          
        );
      }
      
      return (
        <View style={Painel.container}>

            <View>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <MaterialIcons  name="flip-camera-android" size={70} />
              </TouchableOpacity>
            </View>
          <CameraView 
                  barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                  onBarcodeScanned={handleBarcodeScanner}  
                  style={Painel.camera} 
                  facing={facing} 
                  ref={ref}>
            <View></View>
          </CameraView>

            <View>
              <TouchableOpacity onPress={takePicture}>
                <MaterialCommunityIcons name='camera-iris' size={70}/>
              </TouchableOpacity>
            </View>

        </View>
      );
}