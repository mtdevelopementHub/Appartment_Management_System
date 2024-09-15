import React from "react";
import { View,Text,TextInput,TouchableOpacity } from "react-native";
import {width} from "react-native-dimension"
import Colors from "../constants/Colors";
const TextField=({
  IconCategory,
  iconName,
  placeHolder,
  tag,
  endIconName,
  EndIconCat,
  numberofLines,
  maxLength,
  onChange,
  elevation,
  keyboardType,
  value,
  editable
})=>{

  return(
    <View>
      {tag &&
      <Text style={{marginLeft:width(1),fontWeight:"600",marginBottom:width(1),color:Colors.headingColor,fontSize:12}}>
       {tag}
      </Text>
      }
      <View style={{borderRadius:10,backgroundColor:Colors.white,flexDirection:"row",alignItems:"center",paddingHorizontal:width(1),elevation:elevation}}>
        <View style={{alignSelf:numberofLines ? "flex-start" : "center",marginTop:numberofLines ? width(2) : 0}}>
        </View>
        <TextInput
        editable={editable}
        textAlignVertical={numberofLines ?"top" :"center"}
        multiline={numberofLines ? true : false}
        onChangeText={onChange}
        value={value}
        numberOfLines={numberofLines ? numberofLines: 1}
        placeholder={placeHolder}
        placeholderTextColor={Colors.greyText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={{
          color:Colors.blue,
          flex:1,
          height:numberofLines ? width(40) : width(12)
        }}
        />
        {endIconName &&
        <View>
          <EndIconCat
          name={endIconName} size={20} color={Colors.darkGreen}
          />
        </View>
        }
      </View>
      </View>
  )
}

export default TextField