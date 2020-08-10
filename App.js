import React,{useEffect, useState} from "react"
import {SafeAreaView, StatusBar, Text, StyleSheet, View,
Button, YellowBox} from "react-native"
//Importamos las encriptaciones necesarias para hacer el hash 
import {decode, encode} from "base-64"

//Importamos los componentes
import Auth from "./src/components/Auth"
//Importmos firebase
import firebase from "./src/utils/firebase.js"
//firebse auth significa = Authentication
import "firebase/auth";
import ListBirthday from "./src/components/ListBirthday"

//Encriptar la data que sale de la App
if(!global.btoa) global.btoa = encode;
//Decodificar la data que entra a la App
if(!global.atob) global.atob = decode;

//Ignorar los warnigs que comiensen con...
//YellowBox.ignoreWarnings([""])

//Creamos la función de App
export default function App(){
  //useEffect para declarar la variable de usuario y cambiarla después
  const [user, setUser] = useState(undefined)

  //Se corre cuando ya se monta el componente
  //Creamos un usuario por primera vez con "onAuthStateChanged" y "response"
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      //user = response
      setUser(response)
    })
  })
  //Si el usuario no está definido retornamos nulo
  if(user === undefined) return null

  return(
    <>
      {/*Seteamos la barra de arriba de color claro*/}
      <StatusBar barStyle = "light-content"/>
      <SafeAreaView style = {styles.background}>
        {/*Si user fue respondido... 
          Entramos al componente "ListBirthday, si no
          Entramos al componente Auth 
          Acá, estamos estableciendo de que si el usuario ya está logeado
          va directamente al contenido de la App y no pasa por el login, y viceversa"*/}
          {/*También pasamos "user" por props*/}
        {user ? <ListBirthday user = {user}/> : <Auth/>}
      </SafeAreaView>
    </>
  )
}

//Estiloss
const styles = StyleSheet.create({
  background:{
    backgroundColor: "#15212b",
    height: "100%",
  }
})