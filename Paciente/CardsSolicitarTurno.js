import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import {Card, CardItem, Col} from 'native-base'


const { width } = Dimensions.get('window');

export default class CardSolicitarTurno extends Component {
    render() {
      return (
        <View>
          <Card style={{width:width*0.9, alignSelf:"center"}}>
            <CardItem style={{marginVertical:5}}>
              <Col size={3} >
                  <Text style={{fontSize:12, fontWeight:'bold', color:'#1f77a5'}}><Ionicons name='md-time' size={12} color='#1f77a5'></Ionicons> 14.00 Hs</Text>
                  <Text style={{fontSize:14, marginTop:5}}> Dra. RODRIGUEZ, CARLA</Text>
              </Col>
              <Col>
                <TouchableOpacity  style={{marginRight:15}}>
                   <Text style={{color:"#e93922", fontWeight:"bold", fontSize:12 }}>SOLICITAR</Text>
                </TouchableOpacity>
              </Col>   
            </CardItem>
        </Card>
      </View>
  
        
      );
    }
  }