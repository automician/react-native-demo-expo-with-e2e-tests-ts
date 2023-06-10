import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Button from './src/Button'

const isIos = Platform.OS === 'ios'

export default function App() {
  return (
    <View style={styles.container} testID="app">
      <Button text='Sign in with Google' />
      <Button text='Sign in with Github' />
      {isIos && <Button text='Sign in with Apple' />}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
