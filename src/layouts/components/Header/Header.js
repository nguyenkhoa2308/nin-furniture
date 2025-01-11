import { useState } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { AccountIcon, CartIcon, ShoppingCartIcon } from '~/components/Icons/Icons';
import Button from '~/components/Button';
import Search from '../Search';
import DropDownMenu from '~/components/DropDownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const cx = classnames.bind(styles);

const HEADER_TAB = [
    { title: 'Sofa', link: '/sofa' },
    { title: 'Bàn', link: '/desk' },
    { title: 'Ghế', link: '/chair' },
    { title: 'Giường nệm', link: '/beds-mattresses' },
    { title: 'Chăn ga gối', link: '/bedding' },
    { title: 'Tủ kệ', link: '/store-organization' },
    { title: 'Nội thất văn phòng', link: '/office' },
    { title: 'Trang trí', link: '/decor' },
    { title: 'Nhà bếp', link: '/kitchen' },
    { title: 'Phòng tắm', link: '/bathroom' },
];

function Header() {
    const [activeTab, setActiveTab] = useState(0);
    const [openDropDownAccount, setOpenDropDownAccount] = useState(false);
    const [openDropDownCart, setOpenDropDownCart] = useState(false);

    const toggleCartDropdown = () => {
        setOpenDropDownCart(!openDropDownCart);
        setOpenDropDownAccount(false); // Ẩn account dropdown nếu đang mở
    };

    const toggleAccountDropdown = () => {
        setOpenDropDownAccount(!openDropDownAccount);
        setOpenDropDownCart(false); // Ẩn cart dropdown nếu đang mở
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-bar')}>
                    <span className={cx('header-logo')}>NinFurniture</span>
                    <div className={cx('header-action')}>
                        <Search />
                        <div className={cx('header-action_account', 'header-action_item')}>
                            <div className={cx('header-action_text')}>
                                <Link to="/" className={cx('header-action__link')} onClick={toggleAccountDropdown}>
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
                                </Link>
                            </div>
                            <div className={cx('header-action_dropdown')}>
                                {openDropDownAccount && (
                                    <DropDownMenu className={cx('dropdown-account')}>
                                        <div className={cx('header-dropdown_content')}>
                                            <div className={cx('account-header')}>
                                                <h2 className={cx('account-title')}>Đăng nhập tài khoản</h2>
                                                <p className={cx('account-subtitle')}>
                                                    Nhập email và mật khẩu của bạn:
                                                </p>
                                            </div>
                                            <div className={cx('account-inner')}>
                                                <form className={cx('login-form')}>
                                                    <div className={cx('input-group')}>
                                                        <input
                                                            type="email"
                                                            placeholder="Email address"
                                                            className={cx('input-field')}
                                                            required
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className={cx('input-icon')}
                                                        />
                                                    </div>{' '}
                                                    <div className={cx('input-group')}>
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            className={cx('input-field')}
                                                            required
                                                        />
                                                        <FontAwesomeIcon icon={faLock} className={cx('input-icon')} />
                                                    </div>
                                                    <Link to="/" className={cx('forgot-password-link')}>
                                                        Quên mật khẩu?
                                                    </Link>
                                                    <Button
                                                        primary
                                                        className={cx('login-btn', {
                                                            // disabled: !email || !password,
                                                        })}
                                                    >
                                                        Đăng nhập
                                                    </Button>
                                                </form>
                                                <p className={cx('signup-text')}>
                                                    Khách hàng mới?{' '}
                                                    <Link to="/" className={cx('signup-link')}>
                                                        Tạo tài khoản
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </DropDownMenu>
                                )}
                            </div>
                        </div>
                        <div className={cx('header-action_cart', 'header-action_item')}>
                            <div className={cx('header-action_text')}>
                                <Link to="/" className={cx('header-action__link')} onClick={toggleCartDropdown}>
                                    <span className={cx('box-icon')}>
                                        <CartIcon />
                                        <span className={cx('count-holder')}>
                                            <span className={cx('count')}>0</span>
                                        </span>
                                    </span>
                                    <span className={cx('box-text', 'text-center')}>
                                        <span className={cx('text-blow')}>Giỏ hàng</span>
                                    </span>
                                </Link>
                            </div>
                            <div className={cx('header-action_dropdown')}>
                                {openDropDownCart && (
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
                                                            <td colspan="2">
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
                                    className={cx('header-item', { active: index === activeTab })}
                                    leftIcon={item.icon}
                                    text
                                    // to={item.link}
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
