//Importaamos los componentes
import React, {useState} from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View} from 'react-native'

import {validateEmail} from "../utils/validations"
import firebase from "../utils/firebase"

//Creamos la función RegisterForm
export default function RegisterForm(props) {
    //Obtenemos las props 
    const{changeForm} = props
    //Creamos el useState para el formulario
    const [formData, setFormData] = useState(defaultValue())
    //Creamos el usetState los errores
    const[formError, setFormErrors] = useState({})

    //Funcion del register donde se crea un objeto con los errores
    const register = () => {
        let errors = {}

        //Condicional para reportar los errores que salgan
        //Si alguno de estos es verdadero... Entrar en el loop
        if(!formData.mail || !formData.password || !formData.repassword){
            //si el formulario del mail es falso, setear errors.mail a true
            if(!formData.mail) errors.mail = true
            //si el formulario de la contraseña es falso, setear errors.password a true
            if(!formData.password) errors.password = true
            //si el formulario del repetir contraseña es falso, setear errors.repasword a true
            if(!formData.repassword) errors.repassword = true
            
            //Si el mail no tiene el formato correspondiente... Levantar el error
        } else if(!validateEmail(formData.mail)){
            errors.mail = true

            //Si las dos contraseñas no son iguales declarar el error
        }else if(formData.password !== formData.repassword){
            //Levantar los errores
            errors.password = true
            errors.repassword = true

            //Si la contraseña tiene menos de dos digitos levantar el rerror en el useState
        }else if(formData.password.length < 6){
            errors.password = true
            errors.repassword = true
            //Si todo lo anterior está correcto...
        }else{
            //Crear un usuario con mail y contraseña
            //El "formData es el objeto con la información"
            firebase.auth().createUserWithEmailAndPassword(formData.mail, formData.password)
            .catch(()=>{
                //Restauramos los objetos
                setFormErrors({
                    mail:true,
                    password: true,
                    repassword: true,
                })
            })
        }
        //Actualizamos el estado
        setFormErrors(errors)
    };

    return (
        <>
            {/*Textinput*/}
            <TextInput
                style = {[styles.input, formError.email && styles.error]}
                //Que aparece cómo default 
                placeholder = "Correo electronico"
                placeholderTextColor = "#969696"
                //Al cambiarse actualizamos el objeto y le damos el "e.nativeEvent" en forma de texto
                //El "e.nativeEvent" es lo que se pasa por el componente
                onChange = {e => setFormData({...formData,mail: e.nativeEvent.text})}
            />  

            <TextInput
                style = {[styles.input, formError.password && styles.error]}
                placeholder = "Contraseña"
                placeholderTextColor = "#969696"
                secureTextEntry = {true}
                //Actualizamos el objeto
                onChange = {e => setFormData({...formData, password: e.nativeEvent.text})}
            />
            <TextInput
                style = {[styles.input, formError.repassword && styles.error]}
                style = {styles.input}
                placeholder = "Repetir contraseña"
                placeholderTextColor = "#969696"
                secureTextEntry = {true}
                onChange ={e => setFormData({...formData,repassword: e.nativeEvent.text})} 
            />
            {/*Se vuelve de color negro al apretar, y tiene las propiedades de un botón
               al precionar tambíen, se ejecuta la función register*/}
            <TouchableOpacity onPress = {register}> 
                <Text style = {styles.btntext}>Registraste</Text>
            </TouchableOpacity>

            <View style = {styles.login}>
                {/*Al presionar, se ejecuta la función cambiar formulario*/}
                <TouchableOpacity onPress = {changeForm}> 
                    <Text style = {styles.btntext}>Login</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

//Los valores Standars son vacíos
function defaultValue(){
    return{
            mail: "",
        password: "",
        repassword: "",
        }
}

//Hoja de estilos
const styles = StyleSheet.create({
    btntext: {
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

    login:{
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20
    },
    error:{
        borderColor:"#940c0c"

    }

})