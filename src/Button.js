import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

const button = props => {
  const content = (
    <View style={styles.button}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
  return <TouchableOpacity onPress={()=>Alert.alert(props.text)}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
  button:{
    padding: 16,
    width: 300,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
  }
})

export default button
