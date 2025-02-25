import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetail.module.scss';
import { ToastContainer } from 'react-toastify';
import ProductInfo from '~/components/ProductInfo';

const cx = classnames.bind(styles);

function ProductDetail() {
    // eslint-disable-next-line
    const [product, setProduct] = useState();
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
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [slug]);

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
                        {product && <ProductInfo data={product} />}
                        <div className={cx('description')}>
                            <h2 className={cx('description-title')}>Mô tả sản phẩm</h2>
                            <div className={cx('description-content')}>{formatString}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product-related-container')}></div>
            {/* <div className={cx('product-viewed-container')}></div> */}
            <ToastContainer />
        </div>
    );
}

export default ProductDetail;
