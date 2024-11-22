import { Dimensions, Image, ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import LItem from '../components/product/LItem'
import { addCarts, addFavorites, getCarts, getFavorites } from '../utils/asyncStorage'
import { setCarts, setFavorites } from '../redux/mainSlice'


const {width,height}=Dimensions.get('window')

const ProductPage:React.FC<any> = ({navigation,route}) => {
    const {favorites,carts}=useSelector((state:RootState)=>state.main)
    const {user}=useSelector((state:RootState)=>state.main)
    const [imgIndex,setImgIndex]=React.useState(0)
    const dispatch=useDispatch()
    const item=route.params.state
    const inset=StatusBar.currentHeight


    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent')
 
    
    const addFavoriteHandler=async (id:any)=>{
        await addFavorites(user.id,id)
        await getFavorites(user.id).then((res) => dispatch(setFavorites(res)));
    }

    const addCartHandler=async (id:any)=>{
        await addCarts(user.id,id)
        await getCarts(user.id).then((res) => dispatch(setCarts(res)));
    }

    

    const addCartFunc=()=>{
        if(carts.includes(item.id)){
            navigation.navigate('Root',{screen:'Cart'})
        }else{
            addCartHandler(item.id)
        }
    }

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
    <ImageBackground source={{uri:item.images[imgIndex]}} style={{width:'100%',height:height*.45,marginTop:inset,overflow:'hidden'}} resizeMode='contain'>
        <View style={{flexDirection:'column',height:height*.45}}>
            <View style={{paddingTop:inset}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16}}>
                    <FontAwesome5Icon name="arrow-left" color={colors.pink} size={24} onPress={()=>navigation.goBack()} />
                    <View style={{backgroundColor:colors.pink,paddingVertical:2,paddingHorizontal:8,borderRadius:8}}>
                        <Text style={{fontFamily:'Nunito',fontSize:18,color:'white',}}>Product Details</Text>
                    </View>
                    <Pressable onPress={()=>addFavoriteHandler(item.id)}>
                        <FontAwesomeIcon name={favorites.includes(item.id) ? "heart" : 'heart-o'} color={colors.pink} size={24} />
                    </Pressable>
                </View>
            </View>
            <View style={{flexDirection:'column',alignItems:'center',gap:12,paddingHorizontal:12,alignSelf:'flex-start',marginTop:16}}>
                {
                    item?.images?.map((img:any,index:any)=>(
                        <Pressable key={index} onPress={()=>setImgIndex(index)}>
                            <View style={{borderWidth:1.5,borderColor:imgIndex===index? colors.pink : '#00000040',borderRadius:4,}}>
                                <Image source={{uri:img}} style={{width: 60,height:60,objectFit:'contain'}}  />
                            </View>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    </ImageBackground>
    <ScrollView showsVerticalScrollIndicator={false} style={{width:width*.9,marginHorizontal:'auto',marginBottom:height*.1,marginTop:5}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontSize:14,color:'#00000090',textTransform:'capitalize',fontFamily:'Nunito'}}>{item.category}</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:4}}>
                <FontAwesomeIcon name="star" color={colors.pink} size={18} />
                <Text style={{fontFamily:'Nunito',color:'#00000090'}}>{item.rating}</Text>
            </View>
        </View>
        <View style={{paddingTop:12}}>
            <Text style={{fontSize:18,color:'#000',fontFamily:'Nunito'}}>{item.title}</Text>
            <Text style={{fontSize:16,color:"#00000090",fontFamily:'Nunito'}}>{item.description}</Text>
        </View>
        <View style={{height:1,width:'100%',backgroundColor:'#00000040',marginVertical:12}}></View>
        <View style={{flexDirection:'row',alignItems:'center',width: width*.8,flexWrap:'wrap',gap:20,justifyContent:'center'}}>
            <LItem text="Brand" item={item.brand} />
            <LItem text="Status" item={item.availabilityStatus} />
            <LItem text="Stock" item={item.stock} />
            <LItem text="Weight" item={item.weight} />
            <LItem text="Return Policy" item={item.returnPolicy} />
            <LItem text="Warranty" item={item.warrantyInformation} />
            <LItem text="Shipping" item={item.shippingInformation} />
        </View>

    </ScrollView>
    <View style={{position:'absolute',bottom:0,borderColor:"#00000050",borderTopLeftRadius:16,borderTopRightRadius:16,width:'100%',height:height*.09,flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:'0 1 7.5 1 #00000030',backgroundColor:'#fff'}}>
        <View style={{flexDirection:'row',width:width*.85,alignItems:'center',justifyContent:'space-between',}}>
            <View >
                <Text style={{color:'#00000090',fontFamily:"Nunito"}} >Total Price</Text>
                <Text style={{color:"#000",fontFamily:"Nunito",fontWeight:'700',fontSize:18}}>${item.price}</Text>
            </View>
            <View>
                <Pressable onPress={addCartFunc} style={{
                    backgroundColor:colors.pink,paddingHorizontal:20,paddingVertical:12,borderRadius:50,flexDirection:'row',gap:8,alignItems:'center'
                }}>
                    <FontAwesome5Icon name="shopping-cart" color="#fff" size={18} />
                    <Text style={{color:'#fff',fontFamily:'Nunito',fontSize:16}}>{carts.includes(item.id) ? "Buy Now" : "Add to Cart" }</Text>
                </Pressable>
            </View>
        </View>
    </View>
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({})