import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView,TouchableHighlight  } from 'react-native';
import {Card, CardItem, Col, DatePicker, Icon} from 'native-base'


export default function CardDisponibilidadTurno(props) {
    if(props.nro==2){
        var titulo = 'NO HAY TURNOS DISPONIBLES'
        var texto= ' Lo sentimos, no hay turnos disponibles en la fecha seleccionada, le ofrecemos los turnos mas próximos a la misma.'
    }
    if(props.nro==3){
        var titulo = 'NO HAY TURNOS DISPONIBLES'
        var texto= ' Lo sentimos, no hay turnos disponibles por el momento con el profesional seleccionado.'+ "\n" +' Le sugerimos que solicite la lista de espera del mismo o que solicite un turno con otro profesional.'
        var boton = 'SOLICITAR LISTA DE ESPERA DEL MÉDICO'
    }
    if(props.nro==4){
        var titulo = 'TURNOS NO DISPONIBLE'
        var texto= 'Lo sentimos, no puede solicitar un turno para esa especialidad en ese día debido a que ya solicitó uno.'
    }
    if(props.nro==5){
        var titulo = 'NO HAY TURNOS DISPONIBLES'
        var texto= ' Lo sentimos, no hay turnos disponibles por el momento, le recomendamos solicitar la lista de espera'
        var boton = 'SOLICITAR LISTA DE ESPERA'
    }
    if(props.nro==2 || props.nro==4 ){
      return (
        <View style={{marginHorizontal:20, marginBottom:10}}>
            <Card style={{marginHorizontal:50}}>
                <CardItem style={{alignSelf:"center"}}>
                    <Text style={{fontSize:14, textAlign:'center', marginTop:5}}>{titulo}</Text>
                </CardItem>

                <CardItem>
                    <Text style={{fontSize:12, textAlign:'justify', marginHorizontal:5, marginBottom:10}}>{texto}</Text>
                </CardItem>
            </Card>
        </View>
      );
      }
      else{
        return(
        <View style={{marginHorizontal:20, marginBottom:10}}>
        <Card style={{marginHorizontal:50}}>
            <CardItem style={{alignSelf:"center"}}>
                <Text style={{fontSize:14, textAlign:'center', marginTop:5}}>{titulo}</Text>
            </CardItem>

            <CardItem>
                <Text style={{fontSize:12, textAlign:'justify', marginHorizontal:5}}>{texto}</Text>
            </CardItem>
            <CardItem style={{alignSelf:"center"}}>
            <TouchableOpacity>
                <Text style={{fontSize:12, textAlign:'center',fontWeight:'bold' ,marginHorizontal:5, marginBottom:5, color:'#1F77A5'}}>{boton}</Text>
                </TouchableOpacity>
            </CardItem>
        </Card>
    </View>
        );}
  }
  