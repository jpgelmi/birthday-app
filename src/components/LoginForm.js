//Importamos los componentes
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import {validateEmail} from "../utils/validations"
import firebase from "../utils/firebase"

//Creamos la función LoginForm
export default function LoginForm(props) {
    //obtenemos la data mediante las props
    const {changeForm} = props
    //Creamos los hooks useEfect uno con una función y otro con un objetos
    const [formData, setFormData] = useState(defaultValue())
    const[formError, setFormError] = useState({})

    //Creamos la función login, de caracteristicas arrow
    const login = () =>{
        //Creamos los errores cómo un objeto vacío
       let errors = {}
       //Seteamos los errores
       //Si esq alguno de estos componentes no es true... se ingresa al loop
       if(!formData.mail || !formData.password){
           //Si mail es falso... errors.mail = true
           if(!formData.mail) errors.mail = true
           //Si la contraseña es falsa... errors.password = true
           if(!formData.password) errors.password = true
            //Imprimimos en consola el tipo de error definido por el desarollador
           console.log("Error 1")
           //Si esq el mail no tiene el formato que debería
       }else if(!validateEmail(formData.mail)){
           //Levantamos el error 
            errors.mail = true
            //Imprimimos en la consola este nuevo tipo de error
            console.log("Error 2")
       }else{
           //Si no...
           //Ingresamos con usuario y contraseña
           firebase.auth()
           //Login
           .signInWithEmailAndPassword(formData.mail , formData.password)
           //.then(() => {
           //console.log("Ok")
           //})
           .catch(() => {
            setFormError({
                mail: true,
                password: true
            })
           })
       }
       //Actualizamos el estado
       setFormError(errors)
    }

    //Cuando sea corrida la función 
    const onChange = (e, type) => {
        //Mandamos la información y la actualizamos
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return (
        <>
            {/*Text input*/}
            <TextInput
                //Estilos
                style = {[styles.input, formError.mail && styles.error]}
                placeholder = "Correo el ectronico"
                placeholderTextColor = "#969696"
                //Cauando se actualiza el estado...
                //Mandamos "e" a la función onChange que es el mail
                onChange = {(e) => onChange(e, "mail")} 
            />
            <TextInput
                style ={[styles.input, formError.password && styles.error]}
                placeholder = "Contraseña"
                placeholderTextColor = "#969696"
                secureTextEntry = {true}
                //Mandamos "e" a la función onChange que es el password
                onChange = {(e) => onChange(e, "contaseña")} 
            />
            {/*Botón del login
              Al apretar, ingresamos*/}
            <TouchableOpacity onPress = {login}>
                <Text style = {styles.btnText}>Ingresar</Text>
            </TouchableOpacity>
            
            {/*Cambiamos al Register botom*/}
            <View style = {styles.register}>
                <TouchableOpacity onPress = {changeForm}>
                    <Text style = {styles.btnText}> Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

//Reseteamos el valor de mail y password
function defaultValue(){
    return{
        mail: "" ,
        password: "",
    }
}

//Hoja de estilos
const styles = StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18,
    },
    input:{
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 20,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    register: {
        flex:1,
        justifyContent:"center",
        marginBottom: 10
    },
    error:{
        borderColor: "#940c0c"
    }
})
