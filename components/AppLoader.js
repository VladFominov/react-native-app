import React from 'react'
import LottieView from 'lottie-react-native';
import {View,StyleSheet} from 'react-native'


const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
      <LottieView source={require('../assets/animation_ll3njg4o.json')} autoPlay loop/>
    </View>
  )
}

export default AppLoader;

const styles = StyleSheet.create({
container:{
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.3)',
zIndex:1,
}
})
