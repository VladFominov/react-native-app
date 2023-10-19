import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";


const MapScreen = ({route}) => {
 const {longitude,latitude} = route.params.location;
  return(<View style={styles.container}>
    <MapView
    provider={PROVIDER_GOOGLE }
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.006,
      }}
      
    >
      <Marker coordinate={{ latitude,
        longitude,}} title="travel photo" />
    </MapView>
  </View>
  
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
