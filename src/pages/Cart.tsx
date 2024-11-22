import { View, Text, Image, Pressable, Alert } from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import { HeaderTitle } from '@react-navigation/elements'
import { colors } from '../utils/constants'
import SafeAreaView from '../components/global/SafeAreaView'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getCarts, removeCarts } from '../utils/asyncStorage'
import { setCarts } from '../redux/mainSlice'
import { useGetAllProductsQuery } from '../redux/services/fakeApi'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Loading from '../components/global/Loading'

const Cart:React.FC<any> = ({navigation}) => {
    const {user,carts}=useSelector((state:RootState)=>state.main)
    const {data,isLoading,isError}=useGetAllProductsQuery()
    const dispatch=useDispatch()

    

    useEffect(() => {
        getCarts(user.id).then((res) => dispatch(setCarts(res)));
    }, [dispatch, user.id]);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => <HeaderTitle style={{fontFamily:'Nunito',color:colors.pink}}>Cart</HeaderTitle>,
          headerTitleAlign:'left',
        })
      }, [navigation])

      const filteredCarts=data?.products?.filter((item:any)=>carts.includes(item.id))

      const total=filteredCarts.reduce((acc:any,curr:any)=>acc+curr.price,0)

      const removeCartHandler=async (id:any)=>{
        await removeCarts(user.id,id)
        await getCarts(user.id).then((res) => dispatch(setCarts(res)));
      }


     

      if(isLoading) return <Loading />

  return (
   <SafeAreaView>
    <View style={{flexDirection:'row',paddingHorizontal:12,marginTop:6,borderBottomWidth:0.5,borderBottomColor:'#ccc',paddingBottom:12,justifyContent:'space-between'}}>
        <Text style={{fontFamily:'Nunito',fontSize:18,color:colors.pink}}>Total Price:<Text style={{fontWeight:'700',color:'black'}}>  ${total}</Text></Text>
        <Pressable onPress={()=>Alert.alert(
            'No Payment Gateway',
            'This is a fake store, no payment gateway is available at the moment'
        )}>
            <Text style={{fontFamily:'Nunito',fontSize:18,color:colors.pink}}>Checkout</Text>
        </Pressable>
    </View>
     {
        filteredCarts.length > 0 ? (
            <View style={{}} >
                {
                filteredCarts.map((item:any,index:any)=>(
                    <View key={index} style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#ccc',alignItems:'center',justifyContent:'space-between',paddingVertical:8}}>
                        <View style={{flexDirection:'row',gap:8}} >
                            <Image source={{uri:item.images[0]}} style={{width:100,height:100}} />
                            <View style={{flexDirection:'column',justifyContent:'space-evenly'}}>
                                <Text style={{fontSize:16,color:'#000'}}>{item.title}</Text>
                                <Text style={{fontSize:18,color:'#000',fontWeight:'700'}}>${item.price}</Text>
                            </View>
                        </View>
                        <Pressable onPress={()=>removeCartHandler(item.id)} style={{paddingRight:24}}>
                            <FontAwesome5Icon name='trash' size={20} color={colors.pink}  />
                        </Pressable>
                    </View>
                ))
                }
            </View>
            ) : (
            <View style={{marginTop:'20%'}} >
                <Text style={{fontFamily:'Nunito',fontSize:16,color:'#00000090',textAlign:'center'}}>
                You have no items in your cart yet...
                </Text>
            </View>
        ) 
     }
   </SafeAreaView>
  )
}

export default Cart