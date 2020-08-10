//importamos los componentes
import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import firebase from "../utils/firebase"

//Esta función declara los valores de los botone de abajo en el footer
export default function ActionBar(props) {
   //Obtemenemos estos hooks mediante los props
    const{setShowList, showList} = props

    return (
        <View style = {styles.viewFooter}>
            <View style = {styles.viewCoulse}>
                {/*Al apretar el botón... Hacemos un LogOut*/}
                <Text style = {styles.text}
                onPress ={() => {firebase.auth().signOut()}}>Cerrar sesion</Text>
            </View>
            {/*Acá hacemos la funcionalidad de tener dos textos condicionales*/}
            <View style = {styles.viewAdd}> 
                <Text style = {styles.text}
                //Al apretar cambiamos el valor de showlist
                    onPress = {() => setShowList(!showList)}>
                        {/*Los valores del botón, este puede cambiar*/}
                        {showList ? "Nueva fecha" : "Cancelar fecha"}
                </Text>
            </View>
        </View>
    )
}

//Hoja de eatilos
const styles = StyleSheet.create({
    viewFooter :{
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "center",
        paddingHorizontal: 30,
        marginBottom: 20
    },
    viewCoulse:{
        backgroundColor: "#820000",
        borderRadius: 50,
        paddingVertical:10,
        paddingHorizontal: 30
    },
    text:{
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    },
    viewAdd:{
        backgroundColor: "#1ea1f2",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    }
})
