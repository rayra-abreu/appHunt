import React, {Component} from 'react'
import api from '../services/api'
import {useNavigation} from '@react-navigation/native'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'

export default class Main extends Component{
    state={
        productInfo:{},
        docs:[],
        page:1,
    }
    
    componentDidMount(){
        this.loadProducts()
    }

    loadProducts=async(page=1)=>{
        const response=await api.get(`/products?page=${page}`)

        const {docs, ...productInfo}=response.data

        this.setState({docs: [...this.state.docs, ...docs], productInfo, page})
    }

    loadMore=()=>{
        const{page, productInfo}=this.state

        if(page==productInfo.pages) return

        const pageNumber=page+1

        this.loadProducts(pageNumber)
    }

    renderItem=({item})=>(
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity style={styles.productButton} onPress={()=>{
                this.props.navigation.navigate('Product', {product:item})
            }}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item=>item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },

    list: {
        padding: 20
    },

    productContainer: {
        backgroundColor: '#FFF',
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#333'
    },

    productDescription: {
        color: '#999',
        fontSize: 16,
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        marginTop: 10,
        height: 42,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    productButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    }
})