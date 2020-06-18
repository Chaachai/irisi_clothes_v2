import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import Axios from "axios";

export default class ProductImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: []
        };
    }

    componentDidMount() {
        // axios.get("/api/products/" + this.props.data.unit).then(response => {
        axios
            .get("/api/images/" + this.props.data.unit)
            .then(response => {
                console.log("======================== ", response);
                this.setState({ post: response.data });
            })
            .catch(error => console.log(error));
    }

    render() {
        let images = [];
        this.state.post.map(photo => {
            images.push({
                original: "http://localhost:8000/images/photos/" + photo.image,
                thumbnail: "http://localhost:8000/images/photos/" + photo.image
            });
        });

        return (
            <div>
                <ImageGallery items={images} />
            </div>
        );
    }
}
