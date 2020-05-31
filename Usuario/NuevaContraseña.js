import React, { Component } from 'react';
import { Text, View, TextInput,TouchableOpacity } from 'react-native';

export default class NuevaContraseña extends Component{
    render(){
        return(
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center',width:350}}>
      <Text >
          {"INGRESE UNA NUEVA CONTRASEÑA"}
          </Text>
      </View>
      <View style={{flex:1,justifyContent:'center'}}>
      <Text >
        {"CONTRASEÑA NUEVA"}
      </Text>
      <TextInput
            style={{backgroundColor:"white",height:50,width:350}}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="CONTRASEÑA"
            placeholderTextColor="#cccccc"
          />
          </View>
          <View style={{flex:1,justifyContent:'center'}}>
      <Text >
        {"CONFIRMAR CONTRASEÑA"}
      </Text>
      <TextInput
            style={{backgroundColor:"white",height:50,width:350}}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="CONFIRMAR CONTRASEÑA"
            placeholderTextColor="#cccccc"
          />
          </View>
  <View style={{flex:3,width:150,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('NuevaContraseña')}}
          style={{ width:230 ,alignSelf:'center', backgroundColor:'#e93922'}}>
          <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>CONFIRMAR</Text>
          </TouchableOpacity>
  </View>
  
    </View>
        )
    }
}