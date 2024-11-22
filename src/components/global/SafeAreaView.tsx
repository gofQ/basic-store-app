import { SafeAreaView as SafeArea } from 'react-native'
import React from 'react'


const SafeAreaView:React.FC<any> = ({children,styles}) => {
  return (
    <SafeArea style={{flex:1,backgroundColor:'#fff',...styles}}>
        {children}
    </SafeArea>
  )
}

export default SafeAreaView