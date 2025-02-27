import classnames from 'classnames/bind';

import styles from './NewProducts.module.scss';

const cx = classnames.bind(styles);

function NewProducts() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>{/* <ProductItem /> */}</div>
        </div>
    );
}

export default NewProducts;
