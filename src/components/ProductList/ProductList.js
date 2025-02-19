import classnames from 'classnames/bind';
import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './ProductList.module.scss';
import { CartIcon } from '../Icons';
import Button from '~/components/Button';
import httpRequest from '~/utils/httpRequest';
import { ProductDialog } from '~/components/Dialog';
import { CartContext } from '~/contexts/CartContext';

const cx = classnames.bind(styles);

function ProductList({ onProductCountChange, onBrandChange, sortBy, selectedBrands, selectedPrices }) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const category = useParams();
    const firstLoad = useRef(true);
    const previousCategory = useRef(null);

    const [isProductDialogOpen, setProductDialogOpen] = useState(false);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let queryParams = new URLSearchParams();

                // Thêm nhiều brand vào query
                selectedBrands.forEach((brand) => queryParams.append('brand', brand));

                selectedPrices.forEach((range) => queryParams.append('priceRanges', range));

                if (sortBy) queryParams.append('sortBy', sortBy);
                const res = await httpRequest.get(`/products/category/${category.slug}?${queryParams.toString()}`);

                const filteredProducts = res.filter((product) => product.category.slug === category.slug);
                setProducts(filteredProducts);

                if (previousCategory.current !== category.slug) {
                    firstLoad.current = true;
                    previousCategory.current = category.slug;
                }

                onProductCountChange(filteredProducts.length);

                if (firstLoad.current) {
                    const brands = Array.from(new Set(filteredProducts.map((product) => product.brand))); // Lấy các brand duy nhất
                    onBrandChange(brands);
                    firstLoad.current = false;
                }
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, [category, sortBy, selectedBrands, selectedPrices]);

    const handleAddToCart = async (product) => {
        // await addToCart(productId, quantity);
        setProductDialogOpen(true);
        setProduct(product);

        if (product.variant.length <= 1) {
            setProductDialogOpen(false);
            await addToCart(product._id, 1, product.variant[0]?._id);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={cx('wrapper')}>
            {products.length === 0 ? (
                <div>Không tìm thấy kết quả. Vui lòng thử lại!</div>
            ) : (
                products.map((product, index) => {
                    return (
                        <div className={cx('product-container')} key={index}>
                            <div className={cx('product-card')}>
                                <div className={cx('product-image-container')}>
                                    <Link to={`/products/${product.slug}`}>
                                        <img src={product.image} alt={product.name} className={cx('product-image')} />
                                    </Link>
                                </div>
                                <div className={cx('product-detail')}>
                                    <Link to={`/products/${product.slug}`}>
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
                                    </div>
                                    <div className={cx('product-action')}>
                                        <div className={cx('action-btn')}>
                                            <Button
                                                text
                                                small
                                                className={cx('add-to-cart-btn')}
                                                onClick={() => handleAddToCart(product)}
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
                })
            )}
            <ProductDialog
                data={product}
                isOpen={isProductDialogOpen}
                onClose={() => setProductDialogOpen(false)}
                onConfirm={() => {
                    // deleteCartItem(cartItemId);
                    setProductDialogOpen(false);
                }}
            />
        </div>
    );
}

export default ProductList;
