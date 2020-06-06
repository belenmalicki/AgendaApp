import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
const { width } = Dimensions.get('window');

export default class CardHistorial extends Component {
  constructor(props){
    super(props)
}
  render() {
    return (
      <View style={{ alignItems:'center', marginBottom:10}}>
        <Card style={{width:width*0.9}}>
            <CardItem>
                
                    <Col style={{justifyContent:"center", marginVertical:15}} >
                        <Text style={{fontSize:14, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>07</Text>
                        <Text style={{fontSize:12, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>Abril</Text>
                    </Col>
                    <Col size={3} style={{marginLeft:15}} >
                        <Text style={{fontSize:15}}>{this.props.med}</Text>
                        <Text style={{fontSize:13, marginTop:3}}>{this.props.esp}</Text>
                    </Col>
                
            </CardItem>
        </Card>
     </View>
    );
  }
}
