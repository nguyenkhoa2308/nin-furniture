import classnames from 'classnames/bind';

import styles from './Home.module.scss';
import images from '~/assets/images';
// import Button from '~/components/Button';
import HeroBanner from '~/components/HeroBanner/HeroBanner';
import { Link } from 'react-router-dom';

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
                                    <h3 className={cx('category-block--title')}>Phòng khách</h3>
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
                                    <h3 className={cx('category-block--title')}>Phòng ngủ</h3>
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
                                    <h3 className={cx('category-block--title')}>Phòng ăn và bếp</h3>
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
                                    <h3 className={cx('category-block--title')}>Phòng làm việc</h3>
                                    <Link to="/" className={cx('view-btn')}>
                                        Xem ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('search-box')}></div>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Home;
