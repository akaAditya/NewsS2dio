import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {

    constructor(){
        super();
        console.log("constructor")
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
      }
      async componentDidMount(){
        console.log("cdm")
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f50c8d9c1c384db8adf07d6f866bc1cc&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults,
        loading: false
        });
      }

      handleNextClick = async()=>{

        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f50c8d9c1c384db8adf07d6f866bc1cc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        });
      }}
      handlePrevClick = async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f50c8d9c1c384db8adf07d6f866bc1cc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
          loading: false
        });
      }
    
  render() {
    return (
      <div className="container my-3">
            <h1 className='my-3'>Today's - Top Headlines</h1>
            {this.state.loading && <Spinner />}
            <div className="row">
              {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4 my-2" key={element.url}>
                        <NewsItem title={element.title?element.title:undefined} description={element.description?element.description:undefined} imageUrl={!element.urlToImage?"https://www.reuters.com/resizer/28193HrvgsmzaymhnEsEgw24nmc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/25LO4KW3FBNAXOIUUJ5QDCUL2Q.jpg":element.urlToImage} 
                        newsUrl={element.url}/>
                      </div>
              })}
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
      </div>
     
    )
  }
}

export default News