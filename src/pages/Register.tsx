import { View, Text, Dimensions,TextInput, Pressable, Alert } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { colors } from '../utils/constants'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Input from '../components/global/Input'
import { useRegisterMutation } from '../redux/services/auth'

type RegisterProps = {
    navigation: any
}

const Register:React.FC<RegisterProps> = ({navigation}) => {
    const [register,{isLoading}]=useRegisterMutation()
    const {width,height}=Dimensions.get('window')
    const [userInputs,setUserInputs]=React.useState({
        name:'',
        username:'',
        password:'',
        email:'',
        check:false
    })

    const checkFunc=()=>{
        if(userInputs.check){
            setUserInputs({...userInputs,check:false})
        } else {
            setUserInputs({...userInputs,check:true})
        }
    }

    const setState=(name:string,value:string)=>{
        setUserInputs({...userInputs,[name]:value})
    }

    const handleRegister=async()=>{
        if(userInputs.name==='' || userInputs.username==='' || userInputs.password==='' || userInputs.email===''){
            return Alert.alert(
                'Empty fields',
                'Please fill in all fields'
            )
        }

        if(!userInputs.check){
            return Alert.alert(
                'Terms & Condition',
                'Please agree with terms & condition'
            )
        }

        try{
            const lastName=userInputs.name.split(' ').pop()
            const firstName=userInputs.name.replace(` ${lastName}`,'').trim()
            const data={
                firstName:firstName,
                lastName:lastName,
                username:userInputs.username,
                email:userInputs.email,
                password:userInputs.password
            }
            const response=await register(data).unwrap()
            console.log(response)
            if(response){
                setUserInputs({name:'',username:'',password:'',email:'',check:false})
                Alert.alert(
                    'Success',
                    'Account created successfully, please login'
                )
                navigation.navigate('Login')
            } else {
                return Alert.alert(
                    'Error',
                    'An error occurred, please try again later'
                )
            }

        } catch(error){
            return Alert.alert(
                'Error',
                'An error occurred, please try again later'
            )
    }
    }

  return (
    <SafeAreaView styles={{flexDirection:'column',justifyContent:'center'}}>
        <View style={{alignItems:'center',marginBottom:30,gap:10}}>
            <Text style={{fontSize:32,fontFamily:'Nunito',fontWeight:'600',color:'#000'}}>Create Account</Text>
            <Text style={{fontSize:14,color:'#00000080',fontFamily:'Nunito',width:width*.6,textAlign:'center'}}>Fill your information below.</Text>
        </View>
        <View style={{flexDirection:'column',gap:12,width:width*.8,marginHorizontal:'auto',}}>
            <Input value={userInputs.name} func={(text)=>setState('name',text)} pc='Name' length={50} />
            <Input value={userInputs.username} func={(text)=>setState('username',text)} pc='Username' length={50} />
            <Input value={userInputs.email} func={(text)=>setState('email',text)} pc='Email' />
            <Input value={userInputs.password} func={(text)=>setState('password',text)} pc='Password' password />

            <View style={{flexDirection:'row',alignItems:'center',width:width*.9,gap:8}}>
                <MaterialIcon onPress={checkFunc} name={userInputs.check ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={colors.pink} />
                <Text style={{fontFamily:'Nunito',color:'#000',fontSize:14}}>Agree with <Text style={{color:colors.pink,textDecorationColor:colors.pink,textDecorationLine:'underline'}}>Terms & Condition</Text></Text>
            </View>
            
            <Pressable onPress={handleRegister} style={({pressed}: { pressed: boolean }) => [pressed && {opacity: 0.8}, {marginTop: 12}]}>    
                <Text style={{fontSize:16,color:'#fff',fontFamily:'Nunito',textAlign:'center',padding:12,borderRadius:50,backgroundColor:colors.pink}}>Sign Up</Text>
            </Pressable>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:28}}>
            <Text style={{fontSize:14,color:'#00000080',fontFamily:'Nunito',textAlign:'center'}}>Already have an account? </Text>
            <Pressable onPress={()=>navigation.navigate('Login')}>
                <Text style={{color:colors.pink,fontWeight:'700',fontSize:14,fontFamily:'Nunito'}}>Login</Text>
            </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Register