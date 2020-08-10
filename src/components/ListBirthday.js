import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Alert} from 'react-native'
//Moment es una librería de horarios en RN
import moment from "moment"
//Importamos Los componentes
import ActionBar from "./ActionBar"
import AddBirthday from "./AddBirthday"
//Firebase
import firebase from "../utils/firebase"
//Importamos firesote que es la "Base de datos de Firebase"
import "firebase/firestore"
import Birthday from "./Birthday"

//Para Android
//firebase.firestore().settings({experimentalForceLongPolling: true})

//declaramos db comola base de datos?
const db = firebase.firestore(firebase)

//Creamos la función ListBirthday
export default function ListBirthday(props){
    //Obtenemos user por las props
    const{user} = props
    //Declaramos showlist, birthday, pastBirthay y reloadData
    //Show list actua como bandera
    const [showList, setShowList] = useState(true)
    const [birthday, setBirthday] = useState([])
    const [pastBirthday, setPastBirthday] = useState([])
    const [reloadData, setReloadData] = useState(false)

    //Cuando se cambia reloadData corremos lo siguente
    useEffect(() => {
        //Reiniciamos birthday, parte vacío, a la espera de un nuevo valor
        setBirthday([])
        //Reiniciamos pastBirthday, parte vacío, a la espera de un nuevo valor
        setPastBirthday([])
        //Creamos la promesa..
        db.collection(user.uid)
        //Ordenamos por... datebirth y de manera acendente(asc)
            .orderBy("dateBirth", "asc")
            //obtiene los valores
            .get()
            //Con la promesa obtenemos 
            .then((response) => {
                //"Reiniciamos" el itmesArray
                const itemArray = []
                //Creamos para cada uno el id 
                response.forEach((doc) =>{
                    const data = doc.data()
                    data.id = doc.id;
                    //Metemos data al ItemsArray
                    itemArray.push(data)
                })
                //Actualizamos al itemsArray
                formatData(itemArray)
            })
            setReloadData(false)
    }, [reloadData])
    //Creamos la función formatData
    //Lo que hace es formatear la fecha para que todos tengan la misma hora
    const formatData = (items) => {
        //La fecha de ahora (currentDate) que se formatea de la siguente manera
        //usamos la función moment() y seteamos sus parametros(.set())
        const currentDate = moment().set({
            //La hora es cero
            hour: 0,
            //El minuto es cero
            minute: 0,
            //Los segundoas son 0
            seconds: 0,
            //Las milesiamas son ceros
            millisecond: 0,
        });
        //Creamos el siguente array (lista) que es el cumpleaños de manera temporal 
        const birthdayTempArray = []
        //Creamos el array del cumpleaños pero pasado
        const pastBirthdayTempArray = [];

        //Entramos en el loop forEach... Una especie de for loop
        //Donde tomamos el parametro item
        items.forEach((item) => {
            //Declaramos dateBirth que es la fecha del item...
            //Donde lo convertimos en segundos y lo multiplicamos por 1000
           const dateBirth = new Date(item.dateBirth.seconds * 1000)
           //Declaramos dateBirthday donde es la instancia de moment de dateBirth
           const dateBirthday = moment(dateBirth);
           //obtenemos el año presente de la siguente manera...
           //momentet().btenemos el año
           const currentYear = moment().get("year");
           //Creamos el objeto dateBirthday donde se obtiene el año como valor y 
           // el presente año como su clave
           dateBirthday.set({year: currentYear})
            //Creamos la diferencai de la fecha donde samos los métodos de JS para
            //Obtener la diferencia, lo hacemos en días la diferencia
           const diffDate = currentDate.diff(dateBirthday, "days")
           //Copiamos el item para hacele cambios a la copia y no al original
           const itemTemp = item
           //Esta copia (itemTemp) con la propiedad dateBirth que es la fecha en segundos
           itemTemp.dateBirth = dateBirthday;
           //Hacemos la diferencia de las fechas en los días 
           itemTemp.days = diffDate;
            //Hacemos la condicional
            //Si esq la diferencia de la fechas en días es mayor a cero...
            //La integramos a irthdayTempArray el itemTemp
           if(diffDate <= 0 ){
               birthdayTempArray.push(itemTemp)
               //Si no lo metemos a pastBirthdayTempArray el itemTemp
           }else{
               pastBirthdayTempArray.push(itemTemp);
           }

           //console.log(birthdayTempArray)
           //console.log(pastBirthdayTempArray)
        })
        //Pasamos el objeto birthdayTempArray a birthday mediante setBirthday
        setBirthday(birthdayTempArray)
        //Pasamos el objeto de pastBirthdayTempArray a pastBirthday mediante setPastBirthday
        setPastBirthday(pastBirthdayTempArray)
    }

    //Nueva función de eliminar el cumpleaños
    const deleteBirthday = (birthday) => {
        //Hacemos un popUp o alerta donde preguntamos si lo quiere eliminar
        //También esta estructura está el la documeentacíon de RN para más info
        Alert.alert(
            "Eliminar cumpleaños",
            //Preguntamos el nombre del cumpleños usando la propiedad name y lastname de birthday
            `¿Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    //Al precionar eliminar
                    onPress: () => {
                        //Vamos a db con el user.uid
                        db.collection(user.uid)
                            //Obtenemos el id de firestore
                            .doc(birthday.id)
                            //Depspues lo eliminamos
                            .delete().then(() => {
                                //Volvemos a cargar
                                setReloadData()
                            })
                    }
                }
            ],
            //Propiedad del alert, esto hace que hay que apretar los botones si o si
            //No se puede evitar
            {cancelable: false}
        )
    }

    return (
        <View style = {styles.container}>
            {/*Usamos la siguente condicional...
              Si es que showlist es true (que es un un useState)
              Mostramos lo siguente...*/}
            {showList ? (
                //Usamos un ScrollView
                <ScrollView style = {styles.scrollview}>
                     {/*"Mapeamos" los el objeto birthday, usamos los ojetos item y index*/}
                    {birthday.map((item, index) => (
                        //Usamos el componente Birthday
                        //Y le pasamos objetos por las props
                        <Birthday key = {index} birthday ={item} deleteBirthday = {deleteBirthday}/>
                    ))}
                    {/*"Mapeamos" a los cumpleaños pasados*/}
                    {pastBirthday.map((item, index) =>(
                        <Birthday key = {index} birthday ={item} deleteBirthday = {deleteBirthday}/>
                    ))}
                </ScrollView>
            ):(
                //Renderizamos el componente AddBithday
                <AddBirthday
                user = {user}
                setShowList = {setShowList}
                setReloadData = {setReloadData}/>
            )}
            {/*Renderizamos el componente de abajo, que es el footer con dos botones*/}
            <ActionBar
                setShowList = {setShowList}
                showList = {showList}/>
        </View>
    )
}

//Hoja de estilos
const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        height: "100%"
    },
    scrollview: {
        marginBottom: 50,
        width: "100%"
    }
})
