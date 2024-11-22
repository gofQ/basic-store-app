import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constants'

const LItem:React.FC<any> = ({text,item}) => {
  return (
    <View style={styles.container}>
            <Text style={{fontSize:16,color:'black',fontFamily:'Nunito'}}>{text}</Text>
            <Text style={{fontSize:14,color:colors.pink,fontFamily:'Nunito'}}>{item}</Text>
    </View>
  )
}

export default LItem
const styles = StyleSheet.create({
    container:{flexDirection:'column',alignItems:'center'},
});