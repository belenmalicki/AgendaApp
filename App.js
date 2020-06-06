import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { createSwitchNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import DeudaAlert from './Paciente/DeudaAlert';
import InicioPaciente from './Paciente/InicioPaciente'
import SolicitarTurno from './Paciente/SolicitarTurno'
import SobreNosotros from './Paciente/SobreNosotros'
import Historial from './Paciente/Historial'
import ConfirmarTurno from './Paciente/ConfirmarTurno'
import PerfilPaciente from './Paciente/PerfilPaciente'
import InicioMedico from './Medico/InicioMedico'
import PerfilMedico from './Medico/PerfilMedico'
import OlvidoContraseña from './Usuario/OlvidoContraseña'
import NuevaContraseña from './Usuario/NuevaContraseña'
import { Container, Header, Content, Item, Input } from 'native-base';
import * as Crypto from 'expo-crypto'
import ApiController from './controller/ApiController'
const { width } = Dimensions.get('window');


//VER TOAST DE NATIVE-BASE PARA CUANDO INGRESAN MAL LOS DATOS

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

var Usuario = '';
var Contraseña = '';

class App extends Component {
  hash = async () => {

    const con = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Contraseña
    );
    let data = {
      email: Usuario,
      password: con
    }
    console.log(data)
    ApiController.login(data, this.handleLogin.bind(this))
  }

  handleLogin(response) {
    if (response.status == 404) {
      //alert('Los datos ingresados no coinciden con ningún usuario válido')
      this.props.navigation.navigate('InicioPaciente') //hasta que no tengamos usuarios cargados
    } else {
      response.json().then(usuario => {
        console.log(usuario)
        this.props.navigation.navigate('InicioPaciente')
      })
    }
  }


  render() {
    return (
      <ScrollView contentContainerStyle={{flex:1,backgroundColor:'white'}}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Image style={{ justifyContent: 'center',alignItems: 'center',height:width*0.15, width:width*0.8, marginTop:'45%', marginBottom:'20%'}} source={require('./assets/Images/Logo.png')} />
        <TextInput  
        style={{fontSize:11, paddingLeft:10 ,justifyContent: 'center',alignItems: 'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
        placeholder={'NOMBRE DE USUARIO'}
        onChangeText = {(us) => {Usuario=us}}
        />
        <TextInput  
        style={{fontSize:11,paddingLeft:10,justifyContent: 'center',alignItems: 'center', height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white',  }}
          placeholder={'CONTRASEÑA'}
          onChangeText = {(pass) => {Contraseña=pass}}
        />
        </View>
        <TouchableOpacity style={{ width: 180, marginTop: 15, marginRight: '5%', alignSelf: 'flex-end' }} onPress={() => { this.props.navigation.navigate('OlvidoContraseña') }}>
          <Text style={{ color: '#e93922', fontSize: 11, textAlign: 'right', }}>¿OLVIDASTE TU CONTRASEÑA?</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 60 }}>
          <TouchableOpacity onPress={() => { this.hash() }}
            style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
            <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>INGRESAR</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}
const CerrarSesion = 'Cerrar sesion';





const CustomDrawerContentComponent = (props) => (

    <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View style={{flex: 1 }}>
    <Image style={{alignSelf:'center' ,justifyContent: 'center',height:width*0.1,width:width*0.45, marginTop:10, marginBottom:20}} source={require('./assets/Images/Logo.png')} />
          <DrawerItems {...props} />
    </View>
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',marginTop:width*0.9, marginBottom:20}} onPress={()=>{props.navigation.navigate('App')}}>
       <View style={{marginLeft:18, flexDirection:'row'}}> 
        <Ionicons name="ios-log-out" size={24} color={'black'} />
       <Text style={{marginLeft:25, marginTop:5 ,fontWeight:'bold'}}>  Cerrar sesión</Text>
       </View>
         
    </TouchableOpacity>
    </SafeAreaView>

);

const contenedorPerfilMed = createStackNavigator({
  Historial: {
    screen: PerfilMedico,
    navigationOptions: () => {
      return { headerTitle: 'PERFIL' }
    }

  },
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#e93922' },
      headerTitleStyle: { color: 'white', fontSize: 14 },
      headerTintColor: ('white'),
      headerRight: (<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{ marginRight: 12 }}></Ionicons></TouchableWithoutFeedback>)
    }
  }
})
const StMedico = createStackNavigator({
  InicioMedico: {
    screen: InicioMedico,
    navigationOptions: () => {
      return { headerTitle: 'INICIO' }
    }
  },
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#e93922' },
      headerTitleStyle: { color: 'white', fontSize: 14 },
      headerTintColor: ('white'),
      headerRight: (<TouchableOpacity onPress={() => { navigation.openDrawer() }}><Ionicons name='ios-menu' size={28} color='white' style={{ marginRight: 12 }}></Ionicons></TouchableOpacity>)
    }
  }
});

const dwMedico = createDrawerNavigator({
  StMedico: {
    screen: StMedico,
    navigationOptions: () => {
      return {
        title: ('Inicio'),
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? "#e93922" : 'black'} />

        ),
      }
    },
  },
  contenedorPerfilMe: {
    screen: contenedorPerfilMed,
    navigationOptions: () => {
      return {
        title: ('Perfil'),
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-person" size={24} color={focused ? "#e93922" : 'black'} />

        ),
      }
    }
  }
}, {
  drawerPosition: 'right',

  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#e93922',
    itemsContainerStyle: {
      marginVertical: 10
    }
  }

})



const contenedorApp = createStackNavigator(
  {
    App: {
      screen: App,
      navigationOptions: () => {
        return { headerTitle: '', headerShown: false }
      }
    },
    OlvidoContraseña: {
      screen: OlvidoContraseña,
      navigationOptions: () => {
        return { headerTitle: '' }
      }
    }, NuevaContraseña: {
      screen: NuevaContraseña,
      navigationOptions: () => {
        return { headerTitle: '' }
      }
    },
  }, {
  defaultNavigationOptions: ({ Contraseña }) => {
    return {
      headerStyle: { backgroundColor: '#e93922' },
      headerTitleStyle: { color: 'white', fontSize: 14 },
      headerTintColor: ('white'),
    }
  }
})


const contenedorHist = createStackNavigator({
  Historial: {
    screen: Historial,
    navigationOptions: () => {
      return { headerTitle: 'HISTORIAL' }
    }

  },
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#e93922' },
      headerTitleStyle: { color: 'white', fontSize: 14 },
      headerTintColor: ('white'),
      headerRight: (<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{ marginRight: 12 }}></Ionicons></TouchableWithoutFeedback>)
    }
  }
})
const contenedorSobreNos = createStackNavigator({
  SobreNosotros: {
    screen: SobreNosotros,
    navigationOptions: () => {
      return { headerTitle: 'ACERCA DE' }
    }

  },
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#e93922' },
      headerTitleStyle: { color: 'white', fontSize: 14 },
      headerTintColor: ('white'),
      headerRight: (<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{ marginRight: 12 }}></Ionicons></TouchableWithoutFeedback>)
    }
  }
})
const contenedorPerfil = createStackNavigator({
  Perfil: {
    screen: PerfilPaciente,
    navigationOptions: () => {
      return { headerTitle: 'PERFIL' }
    }

  },
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#e93922' },
      headerTitleStyle: { color: 'white', fontSize: 14 },
      headerTintColor: ('white'),
      headerRight: (<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{ marginRight: 12 }}></Ionicons></TouchableWithoutFeedback>)
    }
  }
})

const StPaciente = createStackNavigator({
  InicioPaciente: {
    screen: InicioPaciente,
    navigationOptions: () => {
      return { headerTitle: 'INICIO' }
    }
  },
  SolicitarTurno:{
    screen:SolicitarTurno,
    navigationOptions:()=>{
      return{ headerTitle:'TURNOS' }
    }},
    ConfirmarTurno:{
      screen:ConfirmarTurno,
      navigationOptions:(navigation)=>{
        return{ headerTitle:'CONFIRMAR',}
    }
}},{
    defaultNavigationOptions:({navigation})=> {
      return{ 
       headerStyle:{backgroundColor:'#e93922'},
       headerTitleStyle:{color:'white', fontSize:14},
       headerTintColor:('white'),
       headerRight:(<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}><Ionicons name='ios-menu' size={28} color='white' style={{marginRight:12}}></Ionicons></TouchableWithoutFeedback>)
      }
    }
  }
)

const dwPaciente = createDrawerNavigator({
  Inicio: {
    screen: StPaciente,
    navigationOptions: () => {
      return {
        title: ('Inicio'),
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? "#e93922" : 'black'} />

        ),
      }
    },
  },
  Perfil: {
    screen: contenedorPerfil,
    navigationOptions: (navigation) => {
      return {
        title: ('Perfil'),
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-person" size={24} color={focused ? "#e93922" : 'black'} />),

      }
    }
  },
  SobreNosotros: {
    screen: contenedorSobreNos,
    navigationOptions: (navigation) => {
      return {
        title: ('Acerca de'),
        drawerIcon: ({ focused }) => (
          <Ionicons name="ios-medical" size={24} color={focused ? "#e93922" : 'black'} />),

      }
    }
  },
  Historial: {
    screen: contenedorHist,
    navigationOptions: () => {
      return {
        title: ('Historial'),
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-clipboard" size={24} color={focused ? "#e93922" : 'black'} />),

      }
    }
  }
}
  , {
    drawerPosition: 'right',

    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#e93922',
      itemsContainerStyle: {
        marginVertical: 10
      }
    }

  })


const SwRoot = createSwitchNavigator({
  App: {
    screen: contenedorApp
  },
  DeudaAlert: {
    screen: DeudaAlert
  },
  StRoot: {
    screen: dwPaciente
  },
  StCont: {
    screen: dwMedico,
  }
})


export default createAppContainer(SwRoot)