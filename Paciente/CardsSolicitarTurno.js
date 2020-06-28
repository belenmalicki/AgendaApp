import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import {Card, CardItem, Col} from 'native-base'
import {withNavigation  } from 'react-navigation';

const { width } = Dimensions.get('window');

class CardSolicitarTurno extends Component {
  constructor(props) {
    super(props);
    
  };
 
    render() {
      var med=this.props.med
      var hora=this.props.hora
      var esp= this.props.espe
      var fecha = this.props.fecha
      var id=this.props.id
      return (
        <View>
          <Card style={{width:width*0.9, alignSelf:"center"}}>
            <CardItem style={{marginVertical:5}}>
              <Col size={3} >
                  <Text style={{fontSize:12, fontWeight:'bold', color:'#1f77a5'}}><Ionicons name='md-time' size={12} color='#1f77a5'></Ionicons> {this.props.hora} Hs.</Text>
                  <Text style={{fontSize:14, marginTop:5}}>{med.nombre}</Text>
              </Col>
              <Col>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('ConfirmarTurno', {id:id,med:med, esp:esp, fecha:fecha, hora:hora})}}>
                   <Text style={{color:"#e93922" ,fontWeight:"bold", fontSize:12 }}>SOLICITAR</Text>
                </TouchableOpacity>
              </Col>   
            </CardItem>
        </Card>
      </View>     
      );
    }
  }
  export default withNavigation(CardSolicitarTurno)