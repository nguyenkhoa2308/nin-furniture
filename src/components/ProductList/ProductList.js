import classnames from 'classnames/bind';

import styles from './ProductList.module.scss';

const cx = classnames.bind(styles);

function ProductList() {
    return <div className={cx('wrapper')}></div>;
}

export default ProductList;
