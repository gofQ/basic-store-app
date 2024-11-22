import { View, Text, StyleSheet, Dimensions, TextInput, Pressable,Alert } from 'react-native'
import React from 'react'
import { colors } from '../utils/constants'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useLoginMutation } from '../redux/services/auth'
import { useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken, setUserId } from '../redux/mainSlice'
import Loading from '../components/global/Loading'
import SafeAreaView from '../components/global/SafeAreaView'
import Input from '../components/global/Input'

type LoginProps = {
  navigation: any
}

const Login:React.FC<LoginProps> = ({navigation}) => {
   const [login,{isLoading}]=useLoginMutation()
   const dispatch=useDispatch()
    const {width,height}=Dimensions.get('window')
    const [userInputs,setUserInputs]=React.useState({
        username:'',
        password:''
    })

    const handleUserInputs=(name:string,value:string)=>{
        setUserInputs({...userInputs,[name]:value})
    }

    const handleLogin=async()=>{
        if(userInputs.username==='' || userInputs.password===''){
            return Alert.alert(
                'Empty fields',
                'Please fill in all fields'
            )
        }

        try{
          const response=await login({username:userInputs.username,password:userInputs.password}).unwrap()
          if(response.accessToken){
            dispatch(setAccessToken(response.accessToken))
            dispatch(setRefreshToken(response.refreshToken))
            dispatch(setUserId(response.id))
            setUserInputs({username:'',password:''})
            navigation.navigate('Root')
          } else {
            return Alert.alert(
              'Invalid credentials',
              'Please check your credentials and try again'
            )
          }
        } catch(error){
          return Alert.alert(
            'Error',
            'An error occurred, please try again later'
          )
        }

    }

    if(isLoading) return <Loading />

  return (
    <SafeAreaView styles={{flexDirection:'column',justifyContent:'center'}}>
        <View style={{alignItems:'center',marginBottom:30,gap:10}}>
            
            {/* <Image source={require('../img/f.png')} style={{width:width*.3,height:height*.15}} /> */}
            <Text style={{fontSize:32,fontFamily:'Nunito',fontWeight:'600',color:'#000'}}>Login</Text>
            <Text style={{fontSize:14,color:'#00000080',fontFamily:'Nunito'}}>Hi! Welcome back, you've been missed</Text>
        </View>
        <View style={{flexDirection:'column',gap:12,width:width*.8,marginHorizontal:'auto',}}>
    
          <Input value={userInputs.username} func={(text)=>handleUserInputs('username',text)} pc='Username' />
          <Input value={userInputs.password} func={(text)=>handleUserInputs('password',text)} pc='Password' password />

          <View style={{alignItems:'center',alignSelf:'flex-end'}}>
            <Text style={{fontSize:14,color:'#00000080',fontFamily:'Nunito'}}>Forgot Password?</Text>
          </View>

        <Pressable onPress={handleLogin} style={({pressed}: { pressed: boolean }) => [pressed && {opacity: 0.8}, {marginTop: 12}]}
        >
            <Text style={{fontSize:16,color:'#fff',fontFamily:'Nunito',textAlign:'center',padding:12,borderRadius:50,backgroundColor:colors.pink}}>Login</Text>
        </Pressable>

        {/* OR */}
        <View style={{flexDirection:'row',alignItems:'center',marginTop:16}}>
          <View style={{height:1,backgroundColor:'#00000050',width: '35%',}}></View>
          <Text style={{fontSize:12,color:'#00000080',fontFamily:'Nunito',marginHorizontal:10,width:'25%',textAlign:'center'}}>Or login with</Text>
          <View style={{height:1,backgroundColor:'#00000050',width: '35%',}}></View>
        </View>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:12}}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon name='apple' size={24} color='#000' />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon name='google' size={24} color='#db4437' />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon name='facebook' size={24} color='#3b5998'  />
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:28}}>
        <Text style={{fontSize:14,color:'#00000080',fontFamily:'Nunito',textAlign:'center'}}>Don't have an account? </Text>
        <Pressable onPress={()=>navigation.navigate('Register')}>
          <Text style={{color:colors.pink,fontWeight:'700',fontSize:14,fontFamily:'Nunito'}}>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Login
const styles = StyleSheet.create({
  iconContainer:{
    width:50,
    height:50,
    borderRadius:30,
    borderColor:'#00000030',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  }
});