import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './CategoryPage.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classnames.bind(styles);

const SORT_MENU = [
    {
        title: 'Giá: Tăng dần',
        value: 'price-asc',
    },
    {
        title: 'Giá: Giảm dần',
        value: 'price-desc',
    },
    {
        title: 'Tên: A - Z',
        value: 'name-asc',
    },
    {
        title: 'Tên: Z - A',
        value: 'name-desc',
    },
    {
        title: 'Cũ nhất',
        value: 'oldest',
    },
    {
        title: 'Mới nhất',
        value: 'newest',
    },
    {
        title: 'Bán chạy nhất',
        value: 'best-seller',
    },
];

function CategoryPage() {
    const [selectedValue, setSelectedValue] = useState('price-asc');

    const renderMenu = () => {
        return SORT_MENU.map((item, index) => {
            return (
                <Button
                    key={index}
                    className={cx('sortby-option')}
                    leftIcon={
                        <span className={cx('menu-icon')}>
                            {selectedValue === item.value ? <FontAwesomeIcon icon={faCheck} /> : null}
                        </span>
                    }
                    onClick={() => setSelectedValue(item.value)}
                >
                    <span className={cx('menu-item--title')}>{item.title}</span>
                </Button>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('filter')}>
                    {/* filter brand */}
                    <div className={cx('filter-group')}>
                        <div className={cx('filter-group-block')}>
                            <div className={cx('filter-group-title')}>
                                <span className={cx('text')}>Nhà cung cấp</span>
                            </div>
                            <div className={cx('filter-group-content')}>
                                <ul className={cx('checkbox-list')}>
                                    <li className={cx('checkbox-item')}>
                                        <input
                                            type="checkbox"
                                            id="data-brand-1"
                                            value="TAMPA"
                                            className={cx('input-field')}
                                        />
                                        <label className={cx('checkbox-label')} htmlFor="data-brand-1">
                                            TAMPA
                                        </label>
                                    </li>
                                    <li className={cx('checkbox-item')}>
                                        <input
                                            type="checkbox"
                                            id="data-brand-2"
                                            value="NELLY"
                                            className={cx('input-field')}
                                        />
                                        <label className={cx('checkbox-label')} htmlFor="data-brand-2">
                                            NELLY
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* filter price */}
                    <div className={cx('filter-group')}>
                        <div className={cx('filter-group-block')}>
                            <div className={cx('filter-group-title')}>
                                <span className={cx('text')}>Giá</span>
                            </div>
                            <div className={cx('filter-group-content')}>
                                <ul className={cx('checkbox-list')}>
                                    <li className={cx('checkbox-item')}>
                                        <input type="checkbox" id="p1" className={cx('input-field')} />
                                        <label className={cx('checkbox-label')} htmlFor="p1">
                                            <span>Dưới</span>
                                            {' 1.000.000₫'}
                                        </label>
                                    </li>
                                    <li className={cx('checkbox-item')}>
                                        <input type="checkbox" id="p2" className={cx('input-field')} />
                                        <label className={cx('checkbox-label')} htmlFor="p2">
                                            1.000.000₫ - 2.000.000₫
                                        </label>
                                    </li>
                                    <li className={cx('checkbox-item')}>
                                        <input type="checkbox" id="p3" className={cx('input-field')} />
                                        <label className={cx('checkbox-label')} htmlFor="p3">
                                            2.000.000₫ - 3.000.000₫
                                        </label>
                                    </li>
                                    <li className={cx('checkbox-item')}>
                                        <input type="checkbox" id="p4" className={cx('input-field')} />
                                        <label className={cx('checkbox-label')} htmlFor="p4">
                                            <span>Trên</span>
                                            {' 4.000.000₫'}
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* filter color */}
                    {/* filter size */}
                </div>
                <div className={cx('content')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-content')}>
                            <div className={cx('heading-box')}>
                                <h1 className={cx('heading-title')}>Sofa</h1>
                                <div className={cx('filter-box')}>
                                    <span className={cx('title-count')}>
                                        <b>6</b> sản phẩm
                                    </span>
                                </div>
                            </div>

                            <div className={cx('heading-sortby')}>
                                <div className={cx('sortby-container')}>
                                    <p className={cx('sortby-title')}>
                                        <span className={cx('sortby-icon')}>
                                            <FontAwesomeIcon icon={faFilter} />
                                        </span>
                                        Sắp xếp
                                    </p>
                                </div>
                                <div className={cx('dropdown')}>
                                    <div className={cx('menu-list')}>
                                        <div className={cx('menu-body')}>{renderMenu()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('filter-tags')}></div>
                    </div>
                    <div className={cx('list-product')}></div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
