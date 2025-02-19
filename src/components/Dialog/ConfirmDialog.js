import classnames from 'classnames/bind';

import styles from './ConfirmDialog.module.scss';

const cx = classnames.bind(styles);

function ConfirmDialog({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div
            className={cx('modal-overlay', {
                show: isOpen,
            })}
        >
            <div className={cx('modal-content')}>
                <h3 className={cx('title')}>Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ hàng?</h3>
                <div className={cx('modal-action')}>
                    <button className={cx('cancel')} onClick={onClose}>
                        Hủy
                    </button>
                    <button className={cx('remove')} onClick={onConfirm}>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
