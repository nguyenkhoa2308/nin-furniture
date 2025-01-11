import classnames from 'classnames/bind';

import styles from './DropDownMenu.module.scss';

const cx = classnames.bind(styles);

function DropDownMenu({ className, children }) {
    return <div className={cx('wrapper', { [className]: className })}>{children}</div>;
}

export default DropDownMenu;
