import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export default function App () {
  const [isLoading, setIsLoading] = useState()

  const chooseVideo = async () => {
    // we can use the following if there are issues with permissions
    // see https://docs.expo.dev/versions/latest/sdk/imagepicker/#usemedialibrarypermissionsoptions

    const permissions = await ImagePicker.getMediaLibraryPermissionsAsync()
    if (permissions && !permissions.granted) {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    }

    setIsLoading(true)

    await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Videos
    })

    setIsLoading(false)
  }
  return (
    <View style={styles.container}>
      <Button title='Choose video' onPress={chooseVideo} />
      {isLoading ? <ActivityIndicator /> : <></>}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
