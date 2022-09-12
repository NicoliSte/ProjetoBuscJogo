import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Button(props: ButtonProps){
  return (
    <TouchableOpacity>
      <Text>
        {props.title}
      </Text>

    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      
      <Button title= "Send1"/> 
      <Button title= "Send2"/> 
      <Button title= "Send3"/> 
      <Button title= "Hello World"/> 
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },




});
