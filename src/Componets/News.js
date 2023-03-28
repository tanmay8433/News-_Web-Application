import React, { Component } from 'react'
import Newitem from './Newitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static PropTypo = {
        country: PropTypes.string,
        pageSize: this.prototype.number,
        category: PropTypes.string,
    }
    articles = [
        {
            "source": {
                "id": "bbc-sport",
                "name": "BBC Sport"
            },
            "author": null,
            "title": "'Don't be the best, be the only' - the two sides of Wong",
            "description": "England fast bowler Issy Wong tells BBC Sport why she is determined to make a difference on and off the cricket pitch.",
            "url": "http://www.bbc.co.uk/sport/cricket/62872258",
            "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/2046/production/_126726280_issywong.png",
            "publishedAt": "2022-09-17T08:07:25.4149214Z",
            "content": "Aged just 20, Issy Wong has been capped in all formats by England\r\n<table><tr><th>One-day series: England v India</th></tr>\r\n<tr><td>Dates: 18, 21 &amp; 24 September Venues: Hove, Canterbury &amp; Lo… [+5921 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    constructor(props) {
        super(props);
        console.log("hello i am constructor");
        this.state = {

            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category}-AGARWAL NEWS`;
    }






    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3a71c97d93384df5987de38a1afc2831&page=1&pageSize-${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })

    }
    handlePreviousClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3a71c97d93384df5987de38a1afc2831&page=${this.state.page - 1}&pageSize-${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);


        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles
        })





    }

    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3a71c97d93384df5987de38a1afc2831&page=${this.state.page + 1}&pageSize-${this.props.pageSize}`;
            let data = await fetch(url);
            let parseData = await data.json()
            console.log(parseData);
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles
            })

        }
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page * 1 })

    };

    render() {
        console.log("render")

        return (

            <div className="container my-3">
                <h2 classNme="text-center">Latest News-Top Headlines..   {this.props.category}</h2>
                {/* {this.state.loading && <Spinner />}*/}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <return className="row">
                            {this.state.articles.map((element) => (
                                <return className="col-md-4" key={element.url}>
                                    <Newitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />



                                </return>


                            ))}




                        </return> </div>  </InfiniteScroll>
                <div className="container d-flex justify-content-between">

                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous Page</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next Page &rarr;</button>
                </div>
            </div>


        )
    }
}

export default News
