import React from 'react'
import {useRoute, useNavigatino} from '@react-navigation/native'
import {WebView} from 'react-native-webview'

const Product=({route=useRoute(), url=route.params.product.url})=>(<WebView source={{uri: url}}/>)

export default Product