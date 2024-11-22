import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { useGetAllProductsQuery, useGetProductsQuery } from '../redux/services/fakeApi'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites, addFavorites } from '../utils/asyncStorage'
import Loading from '../components/global/Loading'
import { RootState } from '../redux/store'
import { setFavorites } from '../redux/mainSlice'
import ProductItem from '../components/home/ProductItem'
import { HeaderTitle } from '@react-navigation/elements'
import { colors } from '../utils/constants'

const Favorites:React.FC<any> = ({navigation}) => {
  const {user}=useSelector((state:any)=>state.main)
  const {data,isLoading,isError}=useGetAllProductsQuery()
  const {favorites}=useSelector((state:RootState)=>state.main)
  const dispatch=useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle style={{fontFamily:'Nunito',color:colors.pink}}>Favorites</HeaderTitle>,
      headerTitleAlign:'left'
    })
  }, [navigation])

  const favoritesData=data?.products?.filter((item:any)=>favorites.includes(item.id))
 
   if(isLoading) return <Loading />

   const addFavoriteHandler=async (id:any)=>{
    await addFavorites(user.id,id)
    await getFavorites(user.id).then((res) => dispatch(setFavorites(res)));
  }

  return (
    <SafeAreaView>
      {favoritesData.length > 0 ? (
        <ScrollView contentContainerStyle={{
          flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly',gap:24,marginTop:'2%',paddingBottom:'20%'
        }} showsVerticalScrollIndicator={false} >
          {
            favoritesData.map((item:any,index:any)=>(
              <ProductItem key={index} item={item} favFunc={()=>addFavoriteHandler(item.id)} favorites={favorites} navigation={navigation} />
            ))
          }
        </ScrollView>
      ) : (
        <View style={{marginTop:'20%'}} >
          <Text style={{fontFamily:'Nunito',fontSize:16,color:'#00000090',textAlign:'center'}}>
            You have no favorites yet...
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({})