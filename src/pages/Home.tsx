import { View, Text, ScrollView, TextInput, } from 'react-native'
import React, { useEffect } from 'react'
import { useGetAllProductsQuery, useGetCategoriesQuery, useGetProductsQuery } from '../redux/services/fakeApi'
import Loading from '../components/global/Loading'
import { colors } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorites, getFavorites } from '../utils/asyncStorage'
import { useGetUserInformationQuery } from '../redux/services/user'
import { setFavorites, setUser } from '../redux/mainSlice'
import ProductItem from '../components/home/ProductItem'
import { RootState } from '../redux/store'
import Categories from '../components/store/Categories'

const Home:React.FC<any> = ({navigation}) => {
  const {data,isLoading,isError}=useGetAllProductsQuery()
  const {favorites}=useSelector((state:RootState)=>state.main)
  const {data:user,isLoading:isUserLoading}=useGetUserInformationQuery()
  const { data:categories,isLoading:isCategoriesLoading } = useGetCategoriesQuery()
  const [search,setSearch]=React.useState('')
  const dispatch=useDispatch()

  useEffect(() => {
    if (!isUserLoading && user?.id) {
      dispatch(setUser(user)); 
      getFavorites(user.id).then((res) => dispatch(setFavorites(res)));
    }
  }, [dispatch, user, isUserLoading]); 
 

  const addFavoriteHandler=async (id:any)=>{
    await addFavorites(user.id,id)
    await getFavorites(user.id).then((res) => dispatch(setFavorites(res)));
  }

  const filteredData = data?.products?.filter((item:any)=>item.title.toLowerCase().includes(search.toLowerCase()))
  

  if(isLoading || isUserLoading || isCategoriesLoading) return <Loading />

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{paddingBottom:'20%'}}>
      <View style={{}}>
        <TextInput placeholder="Search" style={{padding:10,borderRadius:12,margin:16,color:'#000',fontSize:16,borderWidth:1,borderColor:'#ccc'}} autoCapitalize='none' value={search} onChangeText={(text)=>setSearch(text)}  />
      </View>
      
       <View style={{flexDirection:'column',paddingVertical:10,paddingHorizontal:16}}>
        <View style={{flexDirection:'column',gap:8}}>
          <Text style={{fontSize:28,color:colors.pink,fontWeight:'600',fontFamily:'Candara'}}>Categories</Text>
          <Categories data={categories} navigation={navigation} go />
        </View>
        <View style={{paddingTop:14,paddingBottom:10}}>
          <Text style={{fontSize:28,color:colors.pink,fontWeight:'600',fontFamily:'Candara'}}>Products</Text>
        </View>
         <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly',gap:24}}>
         {
            filteredData.slice(0,20).map((item:any,index:any)=>(
              <ProductItem key={index} item={item} favFunc={()=>addFavoriteHandler(item.id)} favorites={favorites} navigation={navigation} />
            ))
          }
         </View>
       </View>
    </ScrollView>
  )
}

export default Home
