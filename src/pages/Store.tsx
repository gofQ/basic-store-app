import { View, Text, ScrollView, Dimensions, Pressable } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { HeaderTitle } from '@react-navigation/elements'
import { colors } from '../utils/constants'
import { useGetCategoriesQuery, useGetCategoryQuery, useGetProductsQuery } from '../redux/services/fakeApi'
import SafeAreaView from '../components/global/SafeAreaView'
import Loading from '../components/global/Loading'
import ProductItem from '../components/home/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addFavorites, getFavorites } from '../utils/asyncStorage'
import { setFavorites } from '../redux/mainSlice'
import Categories from '../components/store/Categories'


const {width,height}=Dimensions.get('window')

const Store:React.FC<any> = ({navigation}) => {
  const {favorites,user,storeCategory}=useSelector((state:RootState)=>state.main)
  const {data,isLoading,isError}=useGetCategoriesQuery()
  const {data:category,isLoading:isCategoryLoading,isError:isErrorCategory}=useGetCategoryQuery(storeCategory.name)
  const {data:product,isLoading:isProductsLoading,isError:isErrorProduct}=useGetProductsQuery()
  const dispatch=useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle style={{fontFamily:'Nunito',color:colors.pink}}>Store</HeaderTitle>,
      headerTitleAlign:'left'
    })
  }, [navigation])


  if(isLoading || isProductsLoading || isCategoryLoading) return <Loading />

  const addFavoriteHandler=async (id:any)=>{
    await addFavorites(user.id,id)
    await getFavorites(user.id).then((res) => dispatch(setFavorites(res)));
  }

  console.log(product)

  return (
    <SafeAreaView>
      <Text style={{marginLeft:16,fontFamily:'Candara',fontSize:24,color:colors.pink,marginBottom:6}}>Categories</Text>
      <Categories data={data}  />
      <View style={{width:width*.9,marginHorizontal:'auto'}}>
        <Text style={{fontFamily:'Candara',fontSize:24,color:colors.pink,marginVertical:12}}>Products</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingBottom:'60%'
        }}>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly',gap:24}}>
          {
            storeCategory.trigger  ? 
            (
              category && category?.products?.map((item:any,index:any)=>(
                <ProductItem key={index} item={item} favFunc={()=>addFavoriteHandler(item.id)} favorites={favorites} navigation={navigation} />
              ))
            ) :
             (
              product && product?.products?.map((item:any,index:any)=>(
                <ProductItem key={index} item={item} favFunc={()=>addFavoriteHandler(item.id)} favorites={favorites} navigation={navigation} />
              ))
              
             )
            
          }
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Store