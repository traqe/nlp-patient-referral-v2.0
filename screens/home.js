import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InputSymptoms from '../components/InputSymptoms';


export default function Home({ navigation }) {
    
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
            <View style={styles.body}>
              <InputSymptoms navigation={navigation} />
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    body: {
      flex: 1,
      paddingTop: 20,
    },
  });