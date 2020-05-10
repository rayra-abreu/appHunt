import React, {Component} from 'react'
import api from '../../services/api'
import {Link} from 'react-router-dom'
import "./styles.css"

export default class Main extends Component{
    state={
        products:[],
        productInfo:{},
        page:1,
    }
    //Quando utilizar os métodos que pertencem ao React como o render, componentDidMount, etc, não precisam ser arrow functions.
    componentDidMount(){
        //Método é executado assim que os componentes são mostrados em tela.
        this.loadProducts()
    }
    //Nas funções que criamos deve utilizar a sintaxe do ES6 para a função enxergar o escopo da variável this, se referenciando a classe.
    //Arrow function não sobrescreve o valor do this, mantém o valor fora da função.
    loadProducts=async(page=1)=>{
        const response=await api.get(`/products?page=${page}`)
        const {docs, ...productInfo}=response.data
        this.setState({products: docs, productInfo, page})
    }

    prevPage=()=>{
        const {page, productInfo}=this.state

        const pageNumber=page-1

        this.loadProducts(pageNumber)

        if(page==1) return
    }
    nextPage=()=>{
        const {page, productInfo}=this.state
        if(page==productInfo.pages) return

        const pageNumber=page+1

        this.loadProducts(pageNumber)
    }

    render(){
        //<h1>Contagem de produtos:{this.state.products.length}</h1>
        const {products, page, productInfo}=this.state

        return(
            <div className="product-list">
                {products.map(product=>(
                    <article key={product._id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={page==1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page==productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}