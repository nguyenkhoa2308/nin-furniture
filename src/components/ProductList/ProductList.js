import classnames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductList.module.scss';

import httpRequest from '~/utils/httpRequest';
import ProductCard from '~/components/ProductCard';

const cx = classnames.bind(styles);

function ProductList({ onProductCountChange, onBrandChange, sortBy, selectedBrands, selectedPrices }) {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const category = useParams();
    const firstLoad = useRef(true);
    const previousCategory = useRef(null);

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
                    return <ProductCard product={product} key={index} />;
                })
            )}
        </div>
    );
}

export default ProductList;
