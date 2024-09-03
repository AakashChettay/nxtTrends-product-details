import './index.css'

const SimilarProductItem = props => {
  const {similarProductDetails} = props
  const {imageUrl, title, price, brand, rating} = similarProductDetails

  return (
    <li className="similar-prod-list-item">
      <img
        src={imageUrl}
        className="similar-product-img-style"
        alt="similar product"
      />
      <h1 className="title-heading">{title}</h1>
      <p className="brand-style">{`by ${brand}`}</p>
      <div className="price-and-rating-container">
        <p className="price-style">{`Rs ${price}/-`}</p>
        <div className="rating-style">
          <span>{rating}</span>
          <img
            src="https://learning.ccbp.in/question/9416dedf-1a35-4f5f-9210-ca433cd68780"
            alt="star"
            className="star-image"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
