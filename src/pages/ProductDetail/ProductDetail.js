import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductDetail.module.scss';
import ProductImagesSlider from '~/components/ProductImagesSlider';
import Button from '~/components/Button';

const cx = classnames.bind(styles);

function ProductDetail() {
    // eslint-disable-next-line
    const [product, setProduct] = useState();
    const [productImages, setProductImages] = useState([]);
    // const [quantity, setQuantity] = useState(1);
    const [variantSelect, setVariantSelect] = useState(0);
    const [count, setCount] = useState(1);
    const slug = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:410/api/products/${slug.slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
                const images = data.variant.flatMap((variant) => variant.images);
                setProductImages(images);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleIncreaseQuantity = () => {
        if (count < product?.stock) {
            setCount((prev) => prev + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (count > 1) {
            setCount((prev) => prev - 1);
        }
    };

    const handleAddToCart = async (productId, quantity) => {
        try {
            const response = await fetch('http://localhost:410/api/cart/add', {
                method: 'POST', // Sử dụng phương thức POST
                headers: {
                    'Content-Type': 'application/json', // Định dạng JSON
                },
                body: JSON.stringify({ productId, quantity }), // Dữ liệu gửi đi
            });
            if (response.status === 200) {
                console.log('Successful');
            } else {
                console.log('Unsuccessful');
            }
        } catch (error) {
            console.error('Error add to cart:', error);
        }
    };

    const formatString =
        product?.description.trim() === '' ? (
            <span>Chưa có mô tả cho sản phẩm này</span>
        ) : (
            product?.description.split('\n').map((str, index) => {
                return (
                    <span key={index}>
                        {str}
                        <br />
                    </span>
                );
            })
        );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-detail-container')}>
                <div className={cx('container')}>
                    <div className={cx('product-detail-main', 'd-flex', 'flex-wrap', 'row')}>
                        <div className={cx('gallery', 'col-sm-5')}>
                            <div className={cx('sticky-gallery')}>
                                <div className={cx('wrapbox-gallery', 'position-relative')}>
                                    <div className={cx('rounded-1')}>
                                        <ProductImagesSlider images={productImages} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content', 'col-sm-7')}>
                            <div className={cx('wrapbox-detail')}>
                                <div className={cx('heading')}>
                                    <h2 className={cx('heading-title')}>{product?.name}</h2>
                                    <span className={cx('status')}>
                                        {'Tình trạng: '}{' '}
                                        <strong className={cx('strong-text')}>
                                            {product?.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                        </strong>
                                    </span>
                                    <span className={cx('brand')}>
                                        {'Thương hiệu: '}
                                        <strong className={cx('strong-text')}>{product?.brand}</strong>
                                    </span>
                                </div>
                                <div className={cx('price')}>
                                    <span className={cx('label')}>Giá: </span>
                                    <span className={cx('price-final')}>
                                        {new Intl.NumberFormat('en-US').format(product?.priceFinal * 1000)}₫
                                    </span>
                                    {product?.priceFinal !== product?.priceOriginal && (
                                        <>
                                            <del className={cx('price-original')}>
                                                {new Intl.NumberFormat('en-US').format(product?.priceOriginal * 1000)}₫
                                            </del>
                                            <span className={cx('sale-percent')}>
                                                -
                                                {((product?.priceOriginal - product?.priceFinal) /
                                                    product?.priceOriginal) *
                                                    100}
                                                %
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className={cx('variants', 'd-flex', 'align-items-center')}>
                                    <div className={cx('label')}>
                                        Màu sắc:
                                        <strong className={cx('variant-name')}>
                                            {product?.variant[variantSelect].name}
                                        </strong>
                                    </div>
                                    <div className={cx('variant-select')}>
                                        {product?.variant.map((item, index) => {
                                            return (
                                                <Button
                                                    key={index}
                                                    small
                                                    className={cx('variant-option', {
                                                        active: variantSelect === index,
                                                    })}
                                                    onClick={() => {
                                                        setVariantSelect(index);
                                                    }}
                                                >
                                                    {item.name}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={cx('action')}>
                                    <div className={cx('quantity', 'd-flex', 'align-items-center')}>
                                        <div className={cx('label')}>Số lượng:</div>
                                        <div className={cx('counter')}>
                                            <div className={cx('count-btn')} onClick={handleDecreaseQuantity}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </div>
                                            <p className={cx('number')}>{count}</p>
                                            <div className={cx('count-btn')} onClick={handleIncreaseQuantity}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('add-cart-area')}>
                                        <Button
                                            outline
                                            xLarge
                                            className={cx('add-cart-btn')}
                                            onClick={() => handleAddToCart(product._id, count)}
                                        >
                                            Thêm vào giỏ
                                        </Button>
                                        <Button primary xLarge className={cx('buy-btn')}>
                                            Mua ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('description')}>
                                <h2 className={cx('description-title')}>Mô tả sản phẩm</h2>
                                <div className={cx('description-content')}>{formatString}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product-related-container')}></div>
            {/* <div className={cx('product-viewed-container')}></div> */}
        </div>
    );
}

export default ProductDetail;
