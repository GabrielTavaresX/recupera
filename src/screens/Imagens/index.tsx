import { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ButtonInterface } from '../../components/ButtonInterface';
import { Painel } from './style';
import { FontAwesome } from '@expo/vector-icons';

export function Images() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState<string | null>(null);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={Painel.container}>
        <View style={Painel.container}>
          {image && <Image source={{ uri: image }} style={Painel.image}/>}
        </View>
        <FontAwesome style={Painel.icone} onPress={pickImage} name="photo" size={70}/>
    </View>
  );
}
