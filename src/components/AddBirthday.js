//importamo los componentes
import React, { useState }from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"
//Firebase
import firebase from "../utils/firebase"
import "firebase/firestore";

// Si queremos que funcione bien la connección en Android
//firebase.firestore().settings({experimentalForceLongPolling: true})
const db = firebase.firestore(firebase)

//Function AddBirthday
export default function AddBirthday(props){
    //Obtenemos la info mediante las props
    const{user, setShowList, setReloadData} = props
    //Dlecaramos los hooks useState
    const[DatePickerVisible, setDatePickerVisible] = useState(false)
    const[formData, setFormData] = useState({})
    const[formError, setFormError] = useState({})

    //Función para apagar el date picker
    const hideDatePicker = () => {
        setDatePickerVisible(false)
    }

    //Función que maneja la data después de ingresar la data
    const handlerConfirm = (date) => {
        //Hacemos una copia de date y creamos dateBirth 
        const dateBirth = date;
        //Reseteamos el horario... No la fecha para que todos
        //Esto es para que no se formen en distentas fechas
        dateBirth.setHours(0)
        dateBirth.setMinutes(0)
        dateBirth.setSeconds(0)
        //Copiamos el objeto formData y metemos dateBirth
        setFormData({...formData , dateBirth})
        //"Apagamos el picker"
        hideDatePicker()
    }

    //Cambiamos la fecha del picker
    const showDatePicker = () =>{
        setDatePickerVisible(true)
    }

    //Lo que pasa cuando halla un cambio
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    //Lo que pasa al poner el formulario
    const onSubmit = () => {

        //Creamos el objeto de errores
        let errors = {};
        //Si algunos de estos atriburos es falso, estrar en el condicional
        if(!formData.name || !formData.lastname || !formData.dateBirth){
            //Si el dato no está ingresado ponerlo cómo true
            if(!formData.name) errors.name = true
            if(!formData.lastname) errors.lastname = true
            if(!formData.dateBirth) errors.dateBirth = true
            //si no...
        } else {
            //Hacemos una copa de forData y la nombramos en la constante data 
            const data = formData
            //Seteamos los años a cero
            data.dateBirth.setYear(0);
            //Obtenemos el uid
            db.collection(user.uid)
                //Promesas para guardar la info en firebase
                .add(data)
                .then(() => {
                    setReloadData(true)
                    setShowList(true)
                })
                //Recetear el objeto
                .catch(() => {
                    setFormError({name: true, lastname: true, dateBirth: true})
                })
        }
        //Mandar los errores de vuelta
        setFormError(errors)
    }

    return (
        <>
            <View style = {styles.container}>
                {/*Text input
                Aquí obtenemos la info del nombre y el cumpleaños*/}
                <TextInput
                    style = {[styles.input, formError.name && {borderColor: "#940c0c"}]}
                    placeholder = "Nombre"
                    placeholderTextColor = "#969696"
                    onChange = {(e) => onChange(e, "name")}
                />
                <TextInput
                    style = {[styles.input,formError.lastname && {borderColor: "#940c0c"}]}
                    placeholder = "Apellidos"
                    placeholderTextColor = "#969696"
                    onChange = {(e) => onChange(e, "lastname")}
                />

                {/*Este es el date picker en sí*/}
                <View style = {[styles.input, styles.datepicker, formError.dateBirth && {borderColor: "#940c0c"}]}>
                    <Text
                        style = {{color: formData.dateBirth ? "#fff" : "#969696" , fontSize: 18}}
                        //Cuando se apreta... correr la función showDatePicker
                        onPress = {showDatePicker}>
                        {formData.dateBirth
                            //Este es el placeholder condicional
                            ? moment(formData.dateBirth). format("LL")
                            : "Fecha de nacimiento"
                        }
                    </Text>
                </View>
                {/*Boton de crear cumpleaños*/}
                <TouchableOpacity onPress = {onSubmit}>
                    <Text style = {styles.addButton}>Crear cumpleaños</Text>
                </TouchableOpacity>
                
            </View>
                {/*Show picker que no está mostrado... ahora solamente es activdo con
                el componente text y la funcion showDatePicker*/}
                <DateTimePickerModal
                    isVisible = {DatePickerVisible}
                    mode = "date"
                    onConfirm = {handlerConfirm}
                    onCancel = {hideDatePicker}
                />
        </>
    )
}

//Hojas de estilos
const styles = StyleSheet.create({
    container:{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom : 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    datepicker:{
        justifyContent:"center",
    },
    addButton:{
        fontSize:18,
        color: "#fff"
    }
})