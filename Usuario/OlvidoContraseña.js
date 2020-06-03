import React, { Component } from 'react';
import { Text, View,TextInput,TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


export default class OlvidoContraseña extends Component{
  constructor(props) {
    super(props);
  };


    render(){
        return(
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
     
      <Text style={{textAlign:"center", marginVertical:20}} >
          {"¿OLVIDÓ SU CONTRASEÑA?"}
          </Text>
          <Text style={{fontSize:14,textAlign:'justify', marginHorizontal:20, marginBottom:20}} >
        {"Por Favor ingrese los siguientes datos para que pueda generar una nueva contraseña o comuniquese al +54 (011) 5777-3200."}
      </Text>
    
      <View >
      <Text style={{fontSize:12,marginBottom:5}} >
        {"NOMBRE DE USUARIO"}
      </Text>
      <TextInput
            style={{fontSize:10, paddingLeft:10 ,justifyContent: 'center',alignItems: 'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white'}}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="NOMBRE DE USUARIO"
            placeholderTextColor="#cccccc"
          />
          </View>
          <View style={{}}>
      <Text style={{fontSize:12,marginBottom:5}}>
        {"DNI"}
      </Text>
      <TextInput
            style={{fontSize:10, paddingLeft:10 ,justifyContent: 'center',alignItems: 'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="DNI"
            placeholderTextColor="#cccccc"
          />
          </View>
          <View style={{}}>
      <Text style={{fontSize:12,marginBottom:5}}>
        {"NUMERO DE SOCIO"}
      </Text>
      <TextInput
            style={{fontSize:10, paddingLeft:10 ,justifyContent: 'center',alignItems: 'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="NUMERO DE SOCIO"
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