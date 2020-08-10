//Importamos lo componentes
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

//Obtenemos info mediante las props
export default function Birthday(props){
    const {birthday, deleteBirthday} = props
    //Condicional de si el cumpleaños pasó o no
    const pasted = birthday.days > 0 ? true : false
    
    //Función que maneja la daa del cumpleaños 
    const infoDay = () => {
        //Condicional que designa si el cumpleaños es hoy o no
            if(birthday.days === 0){
                return <Text style = {{color: "#fff"}}>Hoy es su cumpleaños </Text>
                //Si no...
            }else{
                //Pasamos el cumpleaños a pocitivo
                const days = -birthday.days;
                //imprimimos el cumpleaños
                console.log(days)
                return(
                    <View style = {styles.textCurrent}>
                        {/*Props de días*/}
                        <Text>{days}</Text>
                        {/*Condicional que designa si mostrar días o día */}
                        <Text>{days === 1 ? " Dia ": "Dias" }</Text>
                    </View>
                )
            }
    }

    return (
        //Condicional que condiciona los distintos estilos
        <TouchableOpacity style = {[styles.card,
            pasted
            ? styles.pasted
            : birthday.days === 0
            ? styles.actual
            : styles.current
            ]}
            //Al apretar correr la función eleimanr el cumpleaños
            onPress = {() => deleteBirthday(birthday)}>
            <View>
                {/*imprimimos el nombre correpondientemente */}
                <Text style = {styles.userName}>{birthday.name} {birthday.lastname}</Text>
                {pasted ? <Text style = {{color: "#fff"}}>Pasado</Text> :<Text></Text> }
            </View>
        </TouchableOpacity>
    )
}

//Hoja de estilos
const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    pasted: {
        backgroundColor: "#820000",
    },
    current: {
        backgroundColor: "#1ae1f2"
    },
    actual:{
        backgroundColor: "#559204"
    },
    userName:{
        color: "#fff",
        fontSize: 16
    },
    textCurrent:{
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})
