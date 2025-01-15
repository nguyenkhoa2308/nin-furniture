import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './ProductList.module.scss';
import { CartIcon } from '../Icons';
import Button from '~/components/Button';
// import ProductItem from '../ProductItem';

const cx = classnames.bind(styles);

function ProductList({ onProductCountChange, onBrandChange }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const category = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:410/api/products'); // Gọi API sản phẩm
                const data = await response.json(); // Chuyển đổi response thành JSON
                const filteredProducts = data.filter((product) => product.category.slug === category.slug); // Lọc sản phẩm theo category.slug
                setProducts(filteredProducts);
                onProductCountChange(filteredProducts.length);
                const brands = Array.from(new Set(filteredProducts.map((product) => product.brand))); // Lấy các brand duy nhất
                onBrandChange(brands);
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, [category, onProductCountChange, onBrandChange]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={cx('wrapper')}>
            {products.map((product, index) => {
                return (
                    // {/* <ProductItem product={product}  /> */}
                    <div className={cx('product-container')} key={index}>
                        <div className={cx('product-card')}>
                            <div className={cx('product-image-container')}>
                                <Link to="/">
                                    <img src={product.image} alt={product.name} className={cx('product-image')} />
                                </Link>
                            </div>
                            <div className={cx('product-detail')}>
                                <Link to="/">
                                    <h3 className={cx('product-name')}>{product.name}</h3>
                                </Link>
                                <div className={cx('product-price')}>
                                    <span
                                        className={cx('price-final', {
                                            sale: product.priceFinal !== product.priceOriginal,
                                        })}
                                    >
                                        {new Intl.NumberFormat('en-US').format(product.priceFinal * 1000)}₫
                                    </span>
                                    {product.priceFinal !== product.priceOriginal && (
                                        <span className={cx('price-original')}>
                                            {new Intl.NumberFormat('en-US').format(product.priceOriginal * 1000)}₫
                                        </span>
                                    )}

                                    {/* {(product.priceFinal).toFixed(3)} */}
                                </div>
                                <div className={cx('product-action')}>
                                    <div className={cx('action-btn')}>
                                        <Button
                                            text
                                            small
                                            className={cx('add-to-cart-btn')}
                                            // rightIcon={<CartIcon width="1.6rem" height="3.1rem" />}
                                        >
                                            Thêm vào giỏ
                                            <span className={cx('cart-icon')}>
                                                <CartIcon width="1.6rem" height="3.1rem" />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;
