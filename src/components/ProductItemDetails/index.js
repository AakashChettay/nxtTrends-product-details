import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

class ProductItemDetails extends Component {
  state = {productQuantity: 1, productItemDetailsList: [], isLoading: false}

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {id} = match.params
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(productDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(product => ({
          id: product.id,
          imageUrl: product.image_url,
          title: product.title,
          style: product.style,
          price: product.price,
          description: product.description,
          brand: product.brand,
          totalReviews: product.total_reviews,
          rating: product.rating,
          availability: product.availability,
        })),
      }
      console.log(updatedData)
      this.setState({productItemDetailsList: updatedData, isLoading: false})
    }
  }

  render() {
    const {productItemDetailsList, productQuantity} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productItemDetailsList

    return (
      <>
        <Header />
        <div className="product-details-section">
          <div className="product-specific-section">
            <img src={imageUrl} alt="product" className="product-item-image" />
            <div className="product-description">
              <h1 className="product-title-heading">{title}</h1>
              <p className="price-money-para">{`Rs ${price}/- `}</p>
              <div className="rating-and-reviews-section">
                <div className="rating-style">
                  <span>{rating}</span>
                  <img
                    src="https://learning.ccbp.in/question/9416dedf-1a35-4f5f-9210-ca433cd68780"
                    alt="star"
                    className="star-image"
                  />
                </div>
                <p className="reviews-para">{`${totalReviews} Reviews`}</p>
              </div>
              <p className="product-description">{description}</p>
              <p className="availability-and-brand-para">
                <span className="availability-and-brand-span">Available: </span>
                {availability}
              </p>
              <p className="availability-and-brand-para">
                <span className="availability-and-brand-span">Brand: </span>
                {brand}
              </p>
              <hr />
              <div className="quantity-inc-dec-feature">
                <button className="inc-dec-btn">-</button>
                <p className="count-of-quantity">{productQuantity}</p>
                <button className="inc-dec-btn">+</button>
              </div>
              <button type="button">ADD TO CART</button>
            </div>
          </div>
          <h1 className="similar-products-heading">Similar Products</h1>
          {similarProducts && similarProducts.length > 0 ? (
            <ul className="similar-product-list">
              {similarProducts.map(similarProduct => (
                <SimilarProductItem
                  key={similarProduct.id}
                  similarProductDetails={similarProduct}
                />
              ))}
            </ul>
          ) : (
            <p>No similar products found</p>
          )}
        </div>
      </>
    )
  }
}
export default ProductItemDetails
