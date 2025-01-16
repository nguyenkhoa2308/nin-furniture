import classnames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import { AccountIcon, CartIcon, ShoppingCartIcon } from '~/components/Icons/Icons';
import Button from '~/components/Button';
import Search from '../Search';
import DropDownMenu from '~/components/DropDownMenu';
import LoginForm from '~/components/LoginForm';

const cx = classnames.bind(styles);

const HEADER_TAB = [
    { title: 'Sofa', slug: 'sofa' },
    { title: 'Bàn', slug: 'desk' },
    { title: 'Ghế', slug: 'chair' },
    { title: 'Giường nệm', slug: 'beds-mattresses' },
    { title: 'Chăn ga gối', slug: 'bedding' },
    { title: 'Tủ kệ', slug: 'store-organization' },
    { title: 'Nội thất văn phòng', slug: 'office' },
    { title: 'Trang trí', slug: 'decor' },
    { title: 'Nhà bếp', slug: 'kitchen' },
    { title: 'Phòng tắm', slug: 'bathroom' },
];

function Header() {
    // eslint-disable-next-line
    const [activeTab, setActiveTab] = useState(-1);
    const [activeDropdown, setActiveDropdown] = useState('');
    const location = useLocation();
    const slug = useParams();
    const accountRef = useRef();
    const cartRef = useRef();
    const dropdownAccountRef = useRef();
    const dropdownCartRef = useRef();

    const toggleDropdown = (dropdown) => {
        setActiveDropdown((prev) => (prev === dropdown ? '' : dropdown));
    };

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown) {
                const isInsideAccount =
                    accountRef.current?.contains(event.target) || dropdownAccountRef.current?.contains(event.target);
                const isInsideCart =
                    cartRef.current?.contains(event.target) || dropdownCartRef.current?.contains(event.target);

                if (!isInsideAccount && !isInsideCart) {
                    setActiveDropdown('');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    useEffect(() => {
        setActiveDropdown('');

        if (location.pathname === '/') {
            // Kiểm tra nếu trang hiện tại là trang chủ
            setActiveTab(-1); // Đặt lại activeTab thành -1 khi về trang chủ
        }
    }, [location.pathname]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-bar')}>
                    <Link to="/">
                        <span className={cx('header-logo')}>NinFurniture</span>
                    </Link>

                    <div className={cx('header-action')}>
                        <Search />
                        <div className={cx('header-action_account', 'header-action_item')}>
                            <div
                                className={cx('header-action_text')}
                                ref={accountRef}
                                onClick={() => toggleDropdown('account')}
                            >
                                <span className={cx('box-icon')}>
                                    <AccountIcon />
                                </span>
                                <span className={cx('box-text')}>
                                    Đăng nhập / Đăng ký
                                    <span className={cx('text-blow')}>
                                        Tài khoản của tôi
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('angle-down-icon')} />
                                    </span>
                                </span>
                            </div>
                            <div className={cx('header-action_dropdown')} ref={dropdownAccountRef}>
                                {activeDropdown === 'account' && (
                                    <DropDownMenu className={cx('dropdown-account')}>
                                        <div className={cx('header-dropdown_content')}>
                                            <div className={cx('account-header')}>
                                                <h2 className={cx('account-title')}>Đăng nhập tài khoản</h2>
                                                <p className={cx('account-subtitle')}>
                                                    Nhập email và mật khẩu của bạn:
                                                </p>
                                            </div>
                                            <LoginForm />
                                        </div>
                                    </DropDownMenu>
                                )}
                            </div>
                        </div>
                        <div className={cx('header-action_cart', 'header-action_item')}>
                            <div
                                className={cx('header-action_text')}
                                ref={cartRef}
                                onClick={() => toggleDropdown('cart')}
                            >
                                <span className={cx('box-icon')}>
                                    <CartIcon />
                                    <span className={cx('count-holder')}>
                                        <span className={cx('count')}>0</span>
                                    </span>
                                </span>
                                <span className={cx('box-text', 'text-center')}>
                                    <span className={cx('text-blow')}>Giỏ hàng</span>
                                </span>
                            </div>
                            <div className={cx('header-action_dropdown')} ref={dropdownCartRef}>
                                {activeDropdown === 'cart' && (
                                    <DropDownMenu className={cx('dropdown-cart')}>
                                        <div className={cx('header-dropdown_content')}>
                                            <p className={cx('box-title')}>Giỏ hàng</p>
                                            <div className={cx('cart-view')}>
                                                <div className={cx('cart-view-scroll')}>
                                                    <div className={cx('cart-view_item')}>
                                                        <table>
                                                            <tbody>
                                                                <tr className={cx('mini-cart__empty')}>
                                                                    <td>
                                                                        <div className={cx('shopping-cart-icon')}>
                                                                            <ShoppingCartIcon />
                                                                        </div>
                                                                        Hiện chưa có sản phẩm
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className={cx('cart-view-line')}></div>
                                            </div>
                                            <div className={cx('cart-view-total')}>
                                                <table className={cx('table-total')}>
                                                    <tbody>
                                                        <tr>
                                                            <td className={cx('total-title')}>TỔNG TIỀN:</td>
                                                            <td className={cx('total-text')}>0₫</td>
                                                        </tr>
                                                        <tr className={cx('mini-cart__button')}>
                                                            <td colSpan="2">
                                                                <Button
                                                                    to="/cart"
                                                                    primary
                                                                    small
                                                                    className={cx('view-cart-btn')}
                                                                >
                                                                    Xem giỏ hàng
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </DropDownMenu>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('header-menu')}>
                    <div className={cx('header-list')}>
                        {HEADER_TAB.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    className={cx('header-item', { active: slug.slug === item.slug })}
                                    leftIcon={item.icon}
                                    outline
                                    to={`/category/${item.slug}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {item.title}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
