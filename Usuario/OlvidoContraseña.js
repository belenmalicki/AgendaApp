import React, { Component } from 'react';
import { Text, View,TextInput,TouchableOpacity } from 'react-native';



export default class OlvidoContraseña extends Component{
  constructor(props) {
    super(props);
  };


    render(){
        return(
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center',width:350}}>
      <Text >
          {"¿OLVIDÓ SU CONTRASEÑA?"}
          </Text>
          <Text >
        {"Por Favor ingrese los siguientes datos para que pueda generar una nueva contraseña o comuniquese al +54 (011) 5777-3200."}
      </Text>
      </View>
      <View style={{flex:1,justifyContent:'center'}}>
      <Text >
        {"NOMBRE DE USUARIO"}
      </Text>
      <TextInput
            style={{backgroundColor:"white",height:50,width:350}}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="NOMBRE DE USUARIO"
            placeholderTextColor="#cccccc"
          />
          </View>
          <View style={{flex:1,justifyContent:'center'}}>
      <Text >
        {"DNI"}
      </Text>
      <TextInput
            style={{backgroundColor:"white",height:50,width:350}}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="DNI"
            placeholderTextColor="#cccccc"
          />
          </View>
          <View style={{flex:1,justifyContent:'center'}}>
      <Text >
        {"NUMERÓ DE SOCIO/ LEGAJO LABORAL"}
      </Text>
      <TextInput
            style={{backgroundColor:"white",height:50,width:350}}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="NUMERÓ DE SOCIO"
            placeholderTextColor="#cccccc"
          />
          </View>
    
          <View style={{flex:1}}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('NuevaContraseña')}}
          style={{ width:230 ,justifyContent:'center',alignSelf:'center', backgroundColor:'#e93922'}}>
          <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
  
    </View>
        )
    }
    
}