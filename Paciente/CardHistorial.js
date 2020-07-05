import React, { Component } from 'react';
import { Text, View,  Dimensions } from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
const { width } = Dimensions.get('window');

export default class CardHistorial extends Component {
  constructor(props){
    super(props)
}
  render() {
    const {med} = this.props;
    const dr = med.genero === 'femenino' ? 'DRA.': 'DR.';
    const stringMed = `${dr} ${med.apellido.toUpperCase()}, ${med.nombre}`
    return (
      <View style={{ alignItems:'center', marginBottom:10}}>
        <Card style={{width:width*0.9}}>
            <CardItem>
                
                    <Col style={{justifyContent:"center", marginVertical:15}} >
                        <Text style={{fontSize:14, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>{this.props.dia}</Text>
                        <Text style={{fontSize:12, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>{this.props.mes}</Text>
                    </Col>
                    <Col size={3} style={{marginLeft:15}} >
                        <Text style={{fontSize:15}}>{stringMed}</Text>
                        <Text style={{fontSize:13, marginTop:3}}>{this.props.esp}</Text>
                    </Col>
                
            </CardItem>
        </Card>
     </View>
    );
  }
}
