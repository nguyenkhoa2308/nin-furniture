import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '~/contexts/AuthContext';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function DefaultLayout() {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await httpRequest.get(`user/account`);
                if (res && !res.message) {
                    setAuth({
                        isAuthenticated: true,
                        user: {
                            email: res.email,
                            name: res.name,
                        },
                    });
                }
            } catch (error) {
                // console.error('Failed to fetch account:', error);
                setAuth({
                    isAuthenticated: false,
                    user: null,
                });
            }
        };

        fetchAccount();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {/* <div className={cx('content')}>{children}</div> */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
