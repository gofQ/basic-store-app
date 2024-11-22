import { View, Text, Image, Dimensions,StyleSheet, Pressable, StatusBar } from 'react-native'
import React, { useLayoutEffect } from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { useGetUserInformationQuery } from '../redux/services/user'
import Loading from '../components/global/Loading'
import { colors } from '../utils/constants'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderTitle } from '@react-navigation/elements'


const Profile:React.FC<any> = ({navigation}) => {
  const {user}=useSelector((state:any)=>state.main)
  const {width,height}=Dimensions.get('window')
  const inset=StatusBar.currentHeight

  return ( 
    <SafeAreaView>
      <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,marginTop:'15%'}}>
        <Image source={{uri:user?.image}} style={{width:100,height:100,borderRadius:50,borderWidth:1,borderColor:'#ccc'}} />
        <Text style={{fontSize:18,fontFamily:'Nunito',paddingTop:12,color:'#000'}}>{user?.firstName+" "+user?.lastName}</Text>
        <Text style={{fontSize:14,fontFamily:'Nunito',color:'#00000090'}}>{user.username}</Text>
      </View>
      
      <View style={{width:width*.9,marginHorizontal:'auto',paddingTop:'5%'}}>
        <Text style={{fontSize:18,fontFamily:'Nunito',color:colors.pink,paddingVertical:12,}}>Personal Information</Text>
        <View style={{gap:20}}>
          <View style={{flexDirection:'column'}}>
            <Text style={{color:colors.pink,fontSize:16,fontFamily:'Nunito'}}>Phone Number</Text>
            <Text style={styles.infoText}>{user?.phone}</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Text style={{color:colors.pink,fontSize:16,fontFamily:'Nunito'}}>Email</Text>
            <Text style={styles.infoText}>{user?.email}</Text>
          </View>
          <View style={{flexDirection:'column',}}>
            <Text style={{color:colors.pink,fontSize:16,fontFamily:'Nunito'}}>Address</Text>
            <Text style={styles.infoText}>{`${user?.address?.address} ${user?.address?.city}, ${user?.address?.state}`}</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Text style={{color:colors.pink,fontSize:16,fontFamily:'Nunito'}}>University</Text>
            <Text style={styles.infoText}>{user?.university.replace('--',' ')}</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Text style={{color:colors.pink,fontSize:16,fontFamily:'Nunito'}}>Company</Text>
            <Text style={styles.infoText}>{user?.company?.name+", "+user?.company?.title}</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Text style={{color:colors.pink,fontSize:16,fontFamily:'Nunito'}}>BTC Address</Text>
            <Text style={styles.infoText}>{user?.crypto?.wallet}</Text>
          </View>
        </View>
        <Pressable onPress={()=>navigation.navigate('Login')} style={{backgroundColor:colors.pink,paddingVertical:8,borderRadius:8,marginTop:32}}>
          <Text style={{color:'white',textAlign:'center',fontFamily:'Nunito',fontSize:16}}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Profile
const styles = StyleSheet.create({
  infoText:{
    fontSize:14,
    fontFamily:'Nunito',
    color:'#000000',
  }
});