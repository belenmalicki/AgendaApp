import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput ,Dimensions, TouchableOpacity,ScrollView, TouchableWithoutFeedback  } from 'react-native';
import {createSwitchNavigator,createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DeudaAlert from './Paciente/DeudaAlert';
import InicioPaciente from './Paciente/InicioPaciente'
import SolicitarTurno from './Paciente/SolicitarTurno'
import SobreNosotros from './Paciente/SobreNosotros'
import Historial from './Paciente/Historial'
import InicioMedico from './Medico/InicioMedico'
import { createDrawerNavigator } from 'react-navigation-drawer';
const { width } = Dimensions.get('window');




const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

class App extends Component {
  render() {
    return (
      <ScrollView>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Image style={{ justifyContent: 'center',alignItems: 'center',height:width*0.15, width:width*0.8, marginTop:'45%', marginBottom:'20%'}} source={require('./assets/Images/Logo.png')} />
        <TextInput  
        style={{fontSize:10, paddingLeft:10 ,justifyContent: 'center',alignItems: 'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
        placeholder={'NOMBRE DE USUARIO'}
        />
        <TextInput  
        style={{fontSize:10,paddingLeft:10,justifyContent: 'center',alignItems: 'center', height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
          placeholder={'CONTRASEÑA'}
        />
        </View>
      <TouchableOpacity style={{width:180 , marginTop:15, marginRight:'5%',alignSelf:'flex-end'}}>
        <Text style={{color:'#e93922', fontSize:11, textAlign:'right',}}>¿OLVIDASTE TU CONTRASEÑA?</Text>
      </TouchableOpacity>
      <View style={{marginTop:60}}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('InicioPaciente')}}
          style={{ width:230 ,alignSelf:'center', backgroundColor:'#e93922'}}>
          <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>INGRESAR</Text>
          </TouchableOpacity>
      </View>

      </ScrollView>
    );
  }
}
const CerrarSesion='Cerrar sesion';
const StMedico = createStackNavigator({
  InicioMedico:{
    screen:InicioMedico,
    navigationOptions:()=>{
      return{ headerTitle:'INICIO' }
    }
  },
},{
  defaultNavigationOptions:({navigation})=> {
    return{ 
     headerStyle:{backgroundColor:'#e93922'},
     headerTitleStyle:{color:'white', fontSize:14},
     headerTintColor:('white'),
     headerRight:(<TouchableWithoutFeedback ><Ionicons name='ios-menu' size={28} color='white' style={{marginRight:12}}></Ionicons></TouchableWithoutFeedback>)
    }
  }
});
const contenedorHist = createStackNavigator({
  Historial:{
    screen:Historial,
    navigationOptions:()=>{
      return{ headerTitle:'HISTORIAL' }
    }

  },
},{
    defaultNavigationOptions:({navigation})=> {
      return{ 
       headerStyle:{backgroundColor:'#e93922'},
       headerTitleStyle:{color:'white', fontSize:14},
       headerTintColor:('white'),
       headerRight:(<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{marginRight:12}}></Ionicons></TouchableWithoutFeedback>)
      }
    }
})
const contenedorSobreNos = createStackNavigator({
  SobreNosotros:{
    screen:SobreNosotros,
    navigationOptions:()=>{
      return{ headerTitle:'SOBRE NOSOTROS' }
    }

  },
},{
    defaultNavigationOptions:({navigation})=> {
      return{ 
       headerStyle:{backgroundColor:'#e93922'},
       headerTitleStyle:{color:'white', fontSize:14},
       headerTintColor:('white'),
       headerRight:(<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{marginRight:12}}></Ionicons></TouchableWithoutFeedback>)
      }
    }
})

const StPaciente = createStackNavigator({
  InicioPaciente:{
    screen:InicioPaciente,
    navigationOptions:()=>{
      return{ headerTitle:'INICIO' }
    }
  },
  SolicitarTurno:{
    screen:SolicitarTurno,
    navigationOptions:()=>{
      return{ headerTitle:'TURNOS',
 }
    }

  },
},{
    defaultNavigationOptions:({navigation})=> {
      return{ 
       headerStyle:{backgroundColor:'#e93922'},
       headerTitleStyle:{color:'white', fontSize:14},
       headerTintColor:('white'),
       headerRight:(<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{marginRight:12}}></Ionicons></TouchableWithoutFeedback>)
      }
    }
})

const dwPaciente = createDrawerNavigator({
  Inicio:{
    screen:StPaciente,
    navigationOptions:()=>{
      return{ title: ('Inicio'),
       drawerIcon: ({ focused }) => (
         <Ionicons name="md-home" size={24} color={focused ? "#e93922" : 'black'} />
 
       ),}
  },
},
  SobreNosotros:{
    screen:contenedorSobreNos,
    navigationOptions:(navigation)=>{
      return{ title: ('Sobre nosotros'),
       drawerIcon: ({ focused }) => (
         <Ionicons  name="ios-medical" size={24} color={focused ? "#e93922" : 'black'} /> ),
        
  }}
  },
  Historial:{
    screen:contenedorHist,
    navigationOptions:()=>{
      return{ title: ('Historial'),
       drawerIcon: ({ focused }) => (
         <Ionicons name="md-clipboard" size={24} color={focused ? "#e93922" : 'black'} /> ),
        
  }}
  }
,
CerrarSesion:{
  screen:CerrarSesion,
  navigationOptions:()=>{
    return{ title: ('Cerrar sesión'),
     drawerIcon: ({ focused }) => (
       <Ionicons name="ios-log-out" size={24} color={focused ? "#e93922" : 'black'} /> ),
      
}}
}}
,{
  drawerPosition: 'right',  
  contentOptions: {
    activeTintColor: '#e93922',
    itemsContainerStyle:{
      marginVertical:10
    }
  }
  
})


const SwRoot = createSwitchNavigator({
  App:{
    screen:App
  },
  DeudaAlert:{
    screen: DeudaAlert
  },
  StRoot:{
    screen:dwPaciente
  }, 
  StCont:{
    screen:StMedico,
  }
})
 
export default createAppContainer(SwRoot)
