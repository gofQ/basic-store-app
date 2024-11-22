import React, { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { colors } from '../../utils/constants'

const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
        <ActivityIndicator size={55} color={colors.pink} />
    </View>
  )
}

export default memo(Loading)