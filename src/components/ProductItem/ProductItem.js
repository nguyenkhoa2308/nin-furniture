import classnames from 'classnames/bind';

import styles from './ProductItem.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { CartIcon } from '../Icons';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

const item = [
    {
        id: 1,
        name: 'Sofa Luxury',
        category: 'sofa',
        price: 500,
        image: images.anh1,
    },
    {
        id: 2,
        name: 'Sofa Modern',
        category: 'sofa',
        price: 750,
        image: images.anh2,
    },
];

function ProductItem() {
    return (
        <div className={cx('wrapper')}>
            {item.map((product, index) => {
                return (
                    <div className={cx('product-card')} key={index}>
                        <div className={cx('product-image-container')}>
                            <Link to="/">
                                <img src={product.image} alt={product.name} className={cx('product-image')} />
                            </Link>
                        </div>
                        <div className={cx('product-detail')}>
                            <Link to="/">
                                <h3 className={cx('product-name')}>{product.name}</h3>
                            </Link>
                            <div className={cx('product-price')}>{product.price}</div>
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
                );
            })}
        </div>
    );
}

export default ProductItem;
