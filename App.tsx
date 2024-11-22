import { StatusBar} from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import Root from './src/router/Root'
import { colors } from './src/utils/constants'

const App = () => {
  return (
    <>
    <StatusBar barStyle={'dark-content'}  backgroundColor={'#fff'}   />
     <Provider store={store}>
      <Root />
    </Provider>
    </>
  )
}

export default App

// const styles = StyleSheet.create({
//   box:{
//     width:200,
//     height:200,
//     backgroundColor:'red',
//     boxShadow:'0px 0px 10px 5px rgba(0,0,0,0.3)'
//   }
// })
