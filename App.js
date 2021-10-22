import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Vibration,
} from 'react-native';

//duration time of vibration
const DURATION = 1000;

const tracks = [
  {
    id: 1,
    url: require('./tracks/dtcev.mp3'),
    title: 'Viet Nam',
  },
  {
    id: 2,
    url: require('./tracks/kml.mp3'),
    title: 'Viet Nam',
  },
];

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

const App = () => {
  const startVibration = () => {
    //start vibration
    Vibration.vibrate(DURATION);
  };

  // const stopVibration = () => {
  //   Vibration.cancel()
  // };

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.pause()}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.play()}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={startVibration}>
          <Text style={styles.text}>Vibrate</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btn} onPress={stopVibration}>
          <Text style={styles.text}></Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
  },
  btn: {
    backgroundColor: '#61dafb',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default App;
