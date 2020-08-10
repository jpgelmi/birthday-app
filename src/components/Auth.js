import React, {useState}from "react"
import { View, Text, StyleSheet, Image} from "react-native"
//Importamos los componentes
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

//Creamos la función Auth 
export default function Auth(){
    //Creamos los useState para el login
    const[islogin, setIslogin] = useState(true)

    //cambiar el login, cambiando al estado contrario
    const changeForm = () =>{
        setIslogin(!islogin)
    }

    return(
        <View style = {styles.view}>
            {/*Usamos la imagen para el login*/}
            <Image
                style = {styles.logo}
                source = {require("../assets/logo.png")}/>
                {/*Creamos la condicional de si está en el login o el register*/}
            {islogin ? (
                <LoginForm
                changeForm = {changeForm}/>
                //Else... registerform
            ):(
                <RegisterForm
                changeForm = {changeForm}/>
            )}
        </View>
    )
}

//Hoja de etilos
const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: "center"   
    },
    logo:{
        width: "80%",
        height: 240,
        marginTop: 50,
        marginBottom: 50
    }
})

