import { StyleSheet, Text, View,ScrollView, Dimensions,Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setStoreCategory } from '../../redux/mainSlice'


const {width,height}=Dimensions.get('window')

type CategoriesProps={
    data:any,
    go?:boolean,
    navigation?:any

}

const Categories:React.FC<CategoriesProps> = ({data,go,navigation}) => {
    const {storeCategory}=useSelector((state:RootState)=>state.main)
    const dispatch=useDispatch()

    const changeCategory=(category:any)=>{
        dispatch(setStoreCategory(category))
        go && navigation.navigate('Store')
    }
  return (
    <View style={{flexDirection:'row',alignItems:'center', height: height*.05}}>
    <ScrollView  horizontal showsHorizontalScrollIndicator={false} >
      {
        data?.map((item:any,index:any)=>(
          <Pressable key={index} onPress={()=>changeCategory(item)}>
            <View  style={{backgroundColor:colors.pink1,paddingVertical:4,paddingHorizontal:12,borderRadius:8,marginHorizontal:8,borderWidth:1,borderColor:storeCategory.name===item && storeCategory.trigger && !go ? colors.pink : 'transparent' }} >
              <Text style={{fontSize:14,color:colors.pink,fontWeight:'600',textTransform:'capitalize',fontFamily:'Nunito'}}>{item.replace('-'," ")}</Text>
            </View>
          </Pressable>
        )
        )
      }
    </ScrollView>
  </View>
  )
}

export default Categories

const styles = StyleSheet.create({})