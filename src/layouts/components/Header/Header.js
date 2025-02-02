import classnames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { MenuItem } from '@mui/material';
import { faAngleDown, faArrowRightFromBracket, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import { AccountIcon, CartIcon, ShoppingCartIcon } from '~/components/Icons/Icons';
import Button from '~/components/Button';
import Search from '../Search';
import DropDownMenu from '~/components/DropDownMenu';
import { AuthContext } from '~/contexts/AuthContext';
import { CartContext } from '~/contexts/CartContext';

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
    const { auth, setAuth } = useContext(AuthContext);

    const slug = useParams();
    const location = useLocation();
    // eslint-disable-next-line
    const [activeTab, setActiveTab] = useState(-1);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const [accountOpen, setAccountOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartQuantities, setCartQuantities] = useState({});

    // eslint-disable-next-line
    const { cartItems, countItems } = useContext(CartContext);

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
        setAccountOpen(true);
    };

    const handleCartClick = (event) => {
        setCartAnchorEl(event.currentTarget);
        setCartOpen(true);
    };

    const handleClose = () => {
        setAccountOpen(false);
        setCartOpen(false);
    };

    const handleIncreaseQuantity = (productId, stock, quantity) => {
        setCartQuantities((prev) => ({
            ...prev,
            [productId]: (prev[productId] || quantity) < stock ? (prev[productId] || quantity) + 1 : stock,
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setCartQuantities((prev) => ({
            ...prev,
            [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
        }));
    };

    const USER_MENU = [
        {
            title: 'Thông tin tài khoản',
            icon: <FontAwesomeIcon icon={faUser} />,
            to: '/account',
            value: 'view-profile',
        },
        {
            title: 'Danh sách địa chỉ',
            icon: <FontAwesomeIcon icon={faAddressBook} />,
            value: 'address-list',
        },
        {
            title: 'Đăng xuất',
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            clickAction: () => {
                localStorage.removeItem('access_token');
                setAuth({
                    isAuthenticated: false,
                    user: {
                        id: '',
                        email: '',
                        name: '',
                    },
                });
                setAccountOpen(false);
            },
            separate: true,
            value: 'logout',
        },
    ];

    useEffect(() => {
        if (location.pathname === '/') {
            // Kiểm tra nếu trang hiện tại là trang chủ
            setActiveTab(-1); // Đặt lại activeTab thành -1 khi về trang chủ
        }
        setAccountOpen(false);
        setCartOpen(false);
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
                            <div onClick={auth.isAuthenticated ? handleAccountClick : null}>
                                <Link className={cx('header-action_text')} to={auth.isAuthenticated ? null : '/login'}>
                                    <span className={cx('box-icon')}>
                                        <AccountIcon />
                                    </span>
                                    {auth.isAuthenticated ? (
                                        <span className={cx('box-text')}>
                                            Tài khoản của
                                            <span className={cx('text-blow')}>
                                                {auth.user.name}{' '}
                                                <FontAwesomeIcon icon={faAngleDown} className={cx('angle-down-icon')} />
                                            </span>
                                        </span>
                                    ) : (
                                        <span className={cx('box-text')}>
                                            Đăng nhập / Đăng ký
                                            <span className={cx('text-blow')}>Tài khoản của tôi</span>
                                        </span>
                                    )}
                                </Link>
                            </div>

                            <DropDownMenu
                                anchorEl={accountAnchorEl}
                                open={accountOpen}
                                handleClose={handleClose}
                                width={205}
                            >
                                {USER_MENU.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={item.clickAction}
                                        className={cx('menu-option', {
                                            separate: item.separate,
                                        })}
                                    >
                                        <span className={cx('menu-icon')}>{item.icon}</span>
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </DropDownMenu>
                        </div>
                        <div className={cx('header-action_cart', 'header-action_item')}>
                            <div className={cx('header-action_text')} onClick={handleCartClick}>
                                <span className={cx('box-icon')}>
                                    <CartIcon />
                                    <span className={cx('count-holder')}>
                                        <span className={cx('count')}>{countItems}</span>
                                    </span>
                                </span>
                                <span className={cx('box-text', 'text-center')}>
                                    <span className={cx('text-blow')}>Giỏ hàng</span>
                                </span>
                            </div>
                            <DropDownMenu anchorEl={cartAnchorEl} open={cartOpen} handleClose={handleClose} width={480}>
                                <div className={cx('header-dropdown_content')}>
                                    <p className={cx('box-title')}>Giỏ hàng</p>
                                    <div className={cx('cart-view')}>
                                        <div className={cx('cart-view-scroll')}>
                                            <div className={cx('cart-view_item')}>
                                                <table>
                                                    {cartItems?.items?.length > 0 ? (
                                                        <tbody>
                                                            {cartItems?.items?.map((cartItem, index) => (
                                                                <tr className={cx('mini-cart__item')} key={index}>
                                                                    <td className={cx('mini-cart__left')}>
                                                                        <Link
                                                                            to={`/products/${cartItem?.product?.slug}`}
                                                                        >
                                                                            <img
                                                                                src={`${cartItem?.product?.image[0]}`}
                                                                                alt={`${cartItem?.product?.name}`}
                                                                            />
                                                                        </Link>
                                                                    </td>
                                                                    <td className={cx('mini-cart__right')}>
                                                                        <p className={cx('mini-cart__title')}>
                                                                            <Link
                                                                                to={`/products/${cartItem?.product?.slug}`}
                                                                            >
                                                                                {cartItem?.product?.name}
                                                                            </Link>
                                                                        </p>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className={cx('mini-cart__quantity')}>
                                                                                <div
                                                                                    className={cx(
                                                                                        'quantity',
                                                                                        'd-flex',
                                                                                        'align-items-center',
                                                                                    )}
                                                                                >
                                                                                    <div
                                                                                        className={cx('count-btn')}
                                                                                        onClick={() =>
                                                                                            handleDecreaseQuantity(
                                                                                                cartItem?.product?._id,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon
                                                                                            icon={faMinus}
                                                                                        />
                                                                                    </div>
                                                                                    <p className={cx('number')}>
                                                                                        {cartQuantities[
                                                                                            cartItem?.product?._id
                                                                                        ] || cartItem?.quantity}
                                                                                    </p>

                                                                                    <div className={cx('counter')}>
                                                                                        <div
                                                                                            className={cx('count-btn')}
                                                                                            onClick={() =>
                                                                                                handleIncreaseQuantity(
                                                                                                    cartItem?.product
                                                                                                        ?._id,
                                                                                                    cartItem?.product
                                                                                                        ?.stock,
                                                                                                    cartItem?.quantity,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                icon={faPlus}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={cx('mini-cart__price')}>
                                                                                {new Intl.NumberFormat('en-US').format(
                                                                                    cartItem?.product?.priceFinal *
                                                                                        1000,
                                                                                )}
                                                                                ₫
                                                                            </div>
                                                                        </div>
                                                                        <div className={cx('mini-cart__remove')}>
                                                                            <Button
                                                                                onlyIcon
                                                                                leftIcon={
                                                                                    <FontAwesomeIcon
                                                                                        icon={faTrashCan}
                                                                                    />
                                                                                }
                                                                            ></Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    ) : (
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
                                                    )}
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
                                                    <td className={cx('total-text')}>
                                                        {cartItems?.items?.length > 0
                                                            ? new Intl.NumberFormat('en-US').format(
                                                                  cartItems?.totalPriceFinal * 1000,
                                                              )
                                                            : 0}
                                                        ₫
                                                    </td>
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
                                    whiteOutline
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
