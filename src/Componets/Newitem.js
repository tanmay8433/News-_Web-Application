import React, { Component } from 'react'

export class Newitem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, date, author, source } = this.props;
        return (
            <div className="my-3">
                <div className="card" > <div>
                    <span class=" badge rounded-pill bg-danger">
                        {source}

                    </span>
                </div>
                    <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/09/18/1600x900/Anupam_Kher_Kangana_Ranaut__1663475297182_1663475307929_1663475307929.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <span className="badge text-bg-primary">New</span>

                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By{!author ? "Unknown" : author} on {new Date(date).toGMTString()} 3 mins ago</small></p>
                        <a href={newsUrl} target="blank" className="btn btn-sn btn-danger">&rarr;Read More&rarr;</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default Newitem
