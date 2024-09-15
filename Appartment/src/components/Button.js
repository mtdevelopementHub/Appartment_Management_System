import React from "react";
import { View,TouchableOpacity,Text,Image } from "react-native";
import {width} from "react-native-dimension"

const Button=({onPress,image,text,color,fontSize,backgroundColor})=>{
    return(
        <TouchableOpacity style={{flexDirection:"row",paddingVertical:width(3),backgroundColor:backgroundColor,justifyContent:"center",elevation:5,borderRadius:18}} onPress={onPress}>
            {image &&
                <Image source={image} style={{height:width(5),width:width(8)}} resizeMode="contain"/>
            }
            <Text style={{color:color,fontSize:fontSize,fontWeight:"700"}}>
                {text}
            </Text>
        </TouchableOpacity>
    )   
}

export default Button