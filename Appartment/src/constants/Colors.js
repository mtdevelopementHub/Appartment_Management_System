import { Appearance } from "react-native"

const theme=Appearance.getColorScheme()
export default colors={
    darkGreen:"#088078",
    backgroundColor:theme == "dark" ? "black":"white",
    textColor:theme== "dark" ? "white":"black",
    boneColor:theme == "dark" ? "#161B22":"#E1E5E8",
    boneHighlightColor: theme == "dark" ? "#3F3F3F" :"#EEF1F3",
    greyText:"#C4C4C4",
    white:"white",
    headingColor:"#404969",
    blue:"#567DF4",
    black:"black",
    darkGrey:"#616161",
    green:"#34A853",
    darkGrey:"#475372",
    orange:"#ff7f50",
    skyBlue:"#29b6f6",

}