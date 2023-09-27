import React from 'react'
import { AntDesign,EvilIcons  } from "@expo/vector-icons";
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
  } from "react-native";

const Post = ({ imageUri,postComment, commentsLink,commentsAmount,likesCountHandler ,likesAmount,locationLink,imageLocation}) => {
 


  return (
    <View style={styles.container}>

    <Image source={{ uri: imageUri }} style={{ width: 350, height: 200 }} />
    <View style={{marginTop: 10}}>
              <Text  style={styles.postCommentText}>{postComment}</Text>
            </View>
    <View style={styles.iconsContainer}>
      <View style={styles.commentsAndLikesContainer}>
      <View>
            <TouchableOpacity
        activeOpacity={0.6}
        onPress={commentsLink}
      >
         <EvilIcons name="comment" size={26} color="#FF6C00" />
         <Text>{commentsAmount}</Text>
      </TouchableOpacity>          
            </View>
            <View style={styles.likesContainer}>
            <TouchableOpacity  onPress={likesCountHandler}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.likesNumber}> {likesAmount}</Text>  
          </View>
      </View>
    
          <TouchableOpacity
        style={styles.loginLink}
        activeOpacity={0.6}
        onPress={locationLink}
      >
        <EvilIcons name="location" size={28} color="black" />
        <Text style={styles.loginLinkText}>{imageLocation}</Text>
      </TouchableOpacity>
    </View>
           
  </View>
  )
}

export default Post;

const styles = StyleSheet.create({
  // container:{
  //   paddingHorizontal: 20,
  // },
  postCommentText:{
    marginLeft: 11,
    fontSize:16,
      fontWeight: 'bold',
  },
  iconsContainer:{
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems: 'center',
    // gap: 20,
    marginTop: 10,
    marginHorizontal:16,
  },
  commentsAndLikesContainer:{
    flexDirection: "row",
      alignItems: 'center',
      gap: 20,
      
  },
likesContainer:{
      flexDirection: "row",
      alignItems: 'center',
      gap: 2,
    },
    likesNumber:{
      fontSize:16,
      fontWeight: 'bold',
    },
    loginLink:{
      marginRight:10,
    },

})


  // const imageLocationLimitText = async({imageLocation}) => {
  //   let currentImgLocation = await imageLocation;
  //  let maxLength = 14;
  //  if(currentImgLocation.length <= maxLength){
  //    return currentImgLocation;
  //   }else{
  //      return currentImgLocation.substring(0, maxLength) + "...";
  //   }
  //  }