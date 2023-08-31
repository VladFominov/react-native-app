import React from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
  } from "react-native";

const Post = ({ imageUri, commentsLink, locationLink }) => {
  return (
    <View>
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    <TouchableOpacity onPress={commentsLink}>
      <Text>Comments</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={locationLink}>
      <Text>Location</Text>
    </TouchableOpacity>
  </View>
  )
}

export default Post;

const styles = StyleSheet.create({

})
