import classNames from 'classnames/bind';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import ApiService from '../../service/api.service';
import axios from 'axios';

// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';

import styles from './CheckOut.module.scss';
import { CartContext } from '~/contexts/CartContext';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function CheckOut() {
    const { cartItems } = useContext(CartContext);

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [isBanking, setIsBanking] = useState(1);
    const [formState, setFormState] = useState({
        fullName: '',
        detailAddress: '',
        phoneNumber: '',
        note: '',
        city: '',
        district: '',
        ward: '',
    });

    // useEffect(() => {
    //     fetchCartData();
    // }, []);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
                );
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    function deleteError(name) {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
        deleteError(name);
    };
    const handleCityChange = (event) => {
        const selectedCityId = event.target.value;
        setSelectedCity(selectedCityId);

        const selectedCityData = cities.find((city) => city.Id === selectedCityId) || null;

        setFormState({
            ...formState,
            city: selectedCityData ? selectedCityData.Name : '', // Đảm bảo không bị lỗi undefined
        });

        setDistricts(selectedCityData ? selectedCityData.Districts : []);

        deleteError('city');
    };

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        setSelectedDistrict(selectedDistrictId);

        const selectedDistrictData = districts.find((district) => district.Id === selectedDistrictId) || null;

        setFormState({
            ...formState,
            district: selectedDistrictData ? selectedDistrictData.Name : '', // Tránh lỗi undefined
        });

        setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
        deleteError('district');
    };

    const handleWardChange = (event) => {
        const selectedWardId = event.target.value;
        setSelectedWard(selectedWardId);

        const selectedWardData = wards.find((ward) => ward.Id === selectedWardId) || null;

        setFormState({
            ...formState,
            ward: selectedWardData ? selectedWardData.Name : '', // Tránh lỗi undefined
        });

        deleteError('ward');
    };

    const handlePaymentMethodSelect = (method) => {
        setIsBanking(method);
    };
    const validateForm = (values) => {
        let errors = {};
        // Họ tên không được để trống
        if (!values.fullName) {
            errors.fullName = 'Họ tên người nhận là bắt buộc';
        }
        if (!values.detailAddress) {
            errors.detailAddress = 'Địa chỉ là bắt buộc';
        }
        const phoneRegExp = /^(\+84|0[3|5|7|8|9])([0-9]{8})\b/;
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Số điện thoại là bắt buộc';
        } else if (!phoneRegExp.test(values.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại không đúng định dạng';
        }
        if (!values.city) {
            errors.city = 'Vui lòng chọn tỉnh/thành phố';
        }
        if (!values.district) {
            errors.district = 'Vui lòng chọn quận/huyện';
        }
        if (!values.ward) {
            errors.ward = 'Vui lòng chọn xã phường';
        }
        return errors;
    };
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const validationErrors = validateForm(formState);
    //     setErrors(validationErrors);
    //     let reqestOrderCode = Number(String(new Date().getTime()).slice(-10));
    //     if (Object.keys(validationErrors).length === 0) {
    //         //Tạo địa chỉ giao hàng
    //         const selectedCityData = cities.find((city) => city.Id === selectedCity);
    //         const selectedDistrictData = districts.find((district) => district.Id === selectedDistrict);
    //         const selectedWardData = wards.find((ward) => ward.Id === selectedWard);
    //         const address =
    //             `${selectedWardData.Name}` + ', ' + `${selectedDistrictData.Name}` + ', ' + `${selectedCityData.Name}`;

    //         if (isBanking === 1) {
    //             //Nếu người dùng chọn thanh toán chuyển khoản
    //             try {
    //                 try {
    //                     const YOUR_DOMAIN = 'http://localhost:3000';
    //                     console.log(reqestOrderCode);
    //                     const response = await ApiService.post('order-payment/create', {
    //                         orderCode: reqestOrderCode,
    //                         amount: 2000,
    //                         description: 'Thanh toan don hang',
    //                         returnUrl: `${YOUR_DOMAIN}`,
    //                         cancelUrl: `${YOUR_DOMAIN}/order`,
    //                     });
    //                     const link_payment = response.data.data.checkoutUrl;
    //                     try {
    //                         const res = await ApiService.post('orders/add', {
    //                             orderCode: reqestOrderCode,
    //                             link_payment: link_payment,
    //                             shippingAddress: formState.detailAddress + ', ' + address,
    //                         });
    //                         if (res.status === 200) {
    //                             console.log('success');
    //                         } else {
    //                             console.log('Error add item to order');
    //                         }
    //                     } catch (error) {
    //                         console.error('Error add to order', error);
    //                     }
    //                     window.location.href = link_payment;
    //                     console.log(response);
    //                 } catch (error) {
    //                     console.error('Error creating orderId:', error);
    //                 }
    //             } catch (error) {
    //                 console.error('Error creating payment link:', error);
    //             }
    //         } else if (isBanking === 0) {
    //             //Nếu người dùng chọn thanh toán khi nhận hàng
    //             try {
    //                 const res = await ApiService.post('orders/add', {
    //                     banking: 0,
    //                     shippingAddress: formState.detailAddress + ', ' + address,
    //                 });
    //                 if (res.status === 200) {
    //                     console.log('success');
    //                     window.location.href = '/';
    //                 } else {
    //                     console.log('Error add item to order');
    //                 }
    //             } catch (error) {
    //                 console.error('Error add to order', error);
    //             }
    //         } else {
    //             //Nếu người dùng chưa chọn hình thức thanh toán
    //             toast.error('Bạn chưa chọn phương thức thanh toán!', {
    //                 position: 'top-right',
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: 'light',
    //             });
    //         }
    //     }
    // };

    return (
        <div className={cx('main-content', 'container')}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <div className={cx('main')}>
                <div className={cx('header')}>
                    <p className={cx('header-title')}>Thông tin giao hàng</p>
                </div>
                <div className={cx('row gy-4')}>
                    <div className={cx('col-12 col-md-7')}>
                        <h3>Chi tiết hóa đơn</h3>
                        <hr></hr>
                        <form className={cx('billing-details')}>
                            <div className={cx('fn')}>
                                <label htmlFor="firstname" className="form-label">
                                    Họ tên người nhận<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    className={cx('first-name', 'form-control')}
                                    id="firstname"
                                    type="text"
                                    name="fullName"
                                    value={formState.fullName}
                                    onChange={handleInputChange}
                                />
                                {errors.fullName && <p className={cx('error-message')}>{errors.fullName}</p>}
                            </div>
                            <div className={cx('phone-number')}>
                                <label className="form-label">
                                    Số điện thoại<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    className={cx('phone-num', 'form-control')}
                                    placeholder="+84xxxxxxxxx"
                                    type="text"
                                    name="phoneNumber"
                                    value={formState.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.phoneNumber && <p className={cx('error-message')}>{errors.phoneNumber}</p>}
                            </div>
                            <div className={cx('select-address')}>
                                <div className={cx('country')}>
                                    <label htmlFor="coun" className="form-label">
                                        Tỉnh / Thành phố<span className={cx('required')}>*</span>
                                    </label>
                                    <select
                                        id="coun"
                                        className={cx('form-select', 'select-placeholder')}
                                        value={selectedCity}
                                        onChange={handleCityChange}
                                    >
                                        <option value="" className={cx('option')}>
                                            Chọn tỉnh/thành phố
                                        </option>
                                        {cities.map((city) => (
                                            <option key={city.Id} value={city.Id} className={cx('option')}>
                                                {city.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.city && <p className={cx('error-message')}>{errors.city}</p>}
                                </div>
                                <div className={cx('district')}>
                                    <label className="form-label">
                                        Quận / Huyện<span className={cx('required')}>*</span>
                                    </label>
                                    <select
                                        id="reg-district"
                                        className={cx('form-select', 'select-placeholder')}
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}
                                    >
                                        <option value="" className={cx('option')}>
                                            Chọn quận / huyện
                                        </option>
                                        {districts.map((district) => (
                                            <option key={district.Id} value={district.Id} className={cx('option')}>
                                                {district.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district && <p className={cx('error-message')}>{errors.district}</p>}
                                </div>
                                <div className={cx('street')}>
                                    <label className="form-label">
                                        Phường / Xã<span className={cx('required')}>*</span>
                                    </label>
                                    <select
                                        id="ward"
                                        className={cx('form-select', 'select-placeholder')}
                                        value={selectedWard}
                                        onChange={handleWardChange}
                                    >
                                        <option value="" className={cx('option')}>
                                            Chọn Phường/Xã
                                        </option>
                                        {wards.map((ward) => (
                                            <option key={ward.Id} value={ward.Id} className={cx('option')}>
                                                {ward.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.ward && <p className={cx('error-message')}>{errors.ward}</p>}
                                </div>
                            </div>
                            <div className={cx('street-address')}>
                                <label className="form-label">
                                    Địa chỉ chi tiết<span className={cx('required')}>*</span>
                                </label>
                                <input
                                    className={cx('street-add', 'form-control')}
                                    placeholder="Số nhà hoặc tên đường"
                                    type="text"
                                    name="detailAddress"
                                    value={formState.detailAddress}
                                    onChange={handleInputChange}
                                />
                                {errors.detailAddress && <p className={cx('error-message')}>{errors.detailAddress}</p>}
                            </div>
                        </form>
                        <form className={cx('additional-information')}>
                            <div>
                                <h3>Thông tin thêm</h3>
                            </div>
                            <div>
                                <hr></hr>
                            </div>
                            <div className={cx('order-notes')}>
                                <label className="form-label">Thêm chú thích (Tùy chọn)</label>
                                <input
                                    className={cx('order', 'form-control')}
                                    type="text"
                                    name="note"
                                    value={formState.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className={cx('col-12 col-md-5')}>
                        <div className={cx('order-payment')}>
                            <div className={cx('inside-order-payment')}>
                                <h3>Sản phẩm của bạn</h3>
                                <div className={cx('your-order')}>
                                    <table className={cx('your-order-table', 'table')}>
                                        <thead>
                                            <tr>
                                                <th className="product-name">Sản phẩm</th>
                                                <th className="product-total">Giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems &&
                                                cartItems?.items?.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr className={cx('cart_item')}>
                                                            <td className={cx('product')}>
                                                                <div className={cx('product-thumbnail')}>
                                                                    <img
                                                                        className={cx('product-img')}
                                                                        src={item?.product?.image}
                                                                        alt={item?.product?.name}
                                                                    />
                                                                    <span
                                                                        className={cx('product-img-quantity')}
                                                                        aria-hidden="true"
                                                                    >
                                                                        {item?.quantity}
                                                                    </span>
                                                                </div>
                                                                <div className={cx('product-desc')}>
                                                                    <span className={cx('product-name')}>
                                                                        {item?.product?.name}
                                                                    </span>
                                                                    <span className={cx('product-variant')}>
                                                                        {item?.variant?.name}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="product-total">
                                                                <span>
                                                                    {new Intl.NumberFormat('en-US').format(
                                                                        item?.product?.priceFinal *
                                                                            item?.quantity *
                                                                            1000,
                                                                    )}
                                                                </span>
                                                                ₫
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))}
                                        </tbody>
                                        <tfoot>
                                            {cartItems && (
                                                <React.Fragment>
                                                    <tr className="order-total">
                                                        <th>Tổng</th>
                                                        <td>
                                                            <strong>
                                                                {new Intl.NumberFormat('en-US').format(
                                                                    cartItems?.totalPriceFinal * 1000,
                                                                )}
                                                                ₫
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )}
                                        </tfoot>
                                    </table>
                                </div>
                                <div className={cx('order-container')}>
                                    <div>
                                        <h3>Chọn phương thức thanh toán</h3>
                                    </div>
                                    <form>
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="local"
                                            checked={isBanking === 1}
                                            className={cx('local-check')}
                                            onChange={() => handlePaymentMethodSelect(1)}
                                        />
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="payment-on-delivery"
                                            checked={isBanking === 0}
                                            className={cx('payment-on-delivery-check')}
                                            onChange={() => handlePaymentMethodSelect(0)}
                                        />
                                        <div className={cx('category')}>
                                            <label htmlFor="local" className={cx('local-bankMethod')}>
                                                <div className={cx('imgName')}>
                                                    <div className={cx('imgContainer', 'local-bank')}>
                                                        <img src="https://i.ibb.co/0K2tB6Q/qr-code-1.png" alt=""></img>
                                                    </div>
                                                    <span className="name">Chuyển khoản ngân hàng (Quét mã QR)</span>
                                                </div>
                                                <span className={cx('check')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                        style={{ color: '#6064b6' }}
                                                    />
                                                </span>
                                            </label>
                                            <label
                                                htmlFor="payment-on-delivery"
                                                className={cx('payment-on-deliveryMethod')}
                                            >
                                                <div className={cx('imgName')}>
                                                    <div className={cx('imgContainer', 'payment-on-delivery')}>
                                                        <img
                                                            src="https://i.ibb.co/M1WqwtQ/Pngtree-cash-on-delivery-bagde-olshop-6359688.png"
                                                            alt=""
                                                            border="0"
                                                        ></img>
                                                    </div>
                                                    <span className="name">Thanh toán khi nhận hàng</span>
                                                </div>
                                                <span className={cx('check')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                        style={{ color: '#6064b6' }}
                                                    />
                                                </span>
                                            </label>
                                        </div>
                                    </form>
                                    <div className={cx('order')}>
                                        <Button
                                            primary
                                            className={cx('submit-btn', {
                                                disabled: !(Object.keys(validateForm(formState)).length === 0),
                                            })}
                                            onClick={() => {
                                                console.log(validateForm(formState));
                                            }}
                                        >
                                            Tiến hành đặt hàng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
