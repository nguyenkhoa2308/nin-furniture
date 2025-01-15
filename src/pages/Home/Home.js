import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import images from '~/assets/images';
// import Button from '~/components/Button';
import HeroBanner from '~/components/HeroBanner/HeroBanner';
import ProductItem from '~/components/ProductItem';

const cx = classnames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('hero-banner')}>
                <HeroBanner />
            </div>
            <div className={cx('home-category')}>
                <div className={cx('category-container')}>
                    <div className={cx('category-list')}>
                        <div className={cx('category-item')}>
                            <div className={cx('category-block')}>
                                <div className={cx('category-block--image')}>
                                    <Link to="/">
                                        <img src={images.livingroom} alt="Phòng khách" />
                                    </Link>
                                </div>
                                <div className={cx('category-block--content')}>
                                    <h3 className={cx('block-title')}>
                                        <Link to="/" className={cx('title-link')}>
                                            Phòng khách
                                        </Link>
                                    </h3>
                                    <Link to="/" className={cx('view-btn')}>
                                        Xem ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('category-item')}>
                            <div className={cx('category-block')}>
                                <div className={cx('category-block--image')}>
                                    <Link to="/">
                                        <img src={images.bedroom} alt="Phòng ngủ" />
                                    </Link>
                                </div>
                                <div className={cx('category-block--content')}>
                                    <h3 className={cx('block-title')}>
                                        <Link to="/" className={cx('title-link')}>
                                            Phòng ngủ
                                        </Link>
                                    </h3>
                                    <Link to="/" className={cx('view-btn')}>
                                        Xem ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('category-item')}>
                            <div className={cx('category-block')}>
                                <div className={cx('category-block--image')}>
                                    <Link to="/">
                                        <img src={images.kitchen} alt="Phòng ăn và bếp" />
                                    </Link>
                                </div>
                                <div className={cx('category-block--content')}>
                                    <h3 className={cx('block-title')}>
                                        <Link to="/" className={cx('title-link')}>
                                            Phòng ăn và bếp
                                        </Link>
                                    </h3>
                                    <Link to="/" className={cx('view-btn')}>
                                        Xem ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('category-item')}>
                            <div className={cx('category-block')}>
                                <div className={cx('category-block--image')}>
                                    <Link to="/">
                                        <img src={images.office} alt="Phòng làm việc" />
                                    </Link>
                                </div>
                                <div className={cx('category-block--content')}>
                                    <h3 className={cx('block-title')}>
                                        <Link to="/" className={cx('title-link')}>
                                            Phòng làm việc
                                        </Link>
                                    </h3>
                                    <Link to="/" className={cx('view-btn')}>
                                        Xem ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <ProductItem />
            </div>
        </div>
    );
}

export default Home;
