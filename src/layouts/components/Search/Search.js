import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

// import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    // const [showResult, setShowResult] = useState(false);
    // const [loading, setLoading] = useState(false);

    // const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        // setSearchResult([]);
        inputRef.current.focus();
    };

    // const hanldeHideResult = () => {
    //     setShowResult(false);
    // };

    // const handleSelectAccout = () => {
    //     setSearchValue('');
    //     setSearchResult([]);
    //     setShowResult(false);
    // };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
        // return;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input
                    className={cx('search-input')}
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm sản phẩm..."
                    spellCheck={false}
                    onChange={handleChange}
                    // onFocus={() => setShowResult(true)}
                />
                {/* {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                )} */}
                {!!searchValue && !false && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                )}

                {/* {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />} */}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default Search;
