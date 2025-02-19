// import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import './style.scss';

// import styles from './ProductImagesSlider.module.scss';

// const cx = classnames.bind(styles);

function ProductImagesSlider({ images, variantIndex }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(variantIndex || 0);

    // Khi variantIndex thay đổi, chuyển cả thumb gallery và ảnh lớn
    useEffect(() => {
        if (thumbsSwiper && variantIndex !== null) {
            thumbsSwiper.slideTo(variantIndex);
        }
        if (mainSwiper && variantIndex !== null) {
            mainSwiper.slideTo(variantIndex);
        }
    }, [variantIndex, thumbsSwiper, mainSwiper]);

    return (
        <div className="wrapper-swiper">
            <Swiper
                onSwiper={setMainSwiper}
                loop={false}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="gallery-slider"
            >
                {images.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img src={item} alt={`thumb ${index}`} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="gallery-thumb"
            >
                {images.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className={index === activeIndex ? 'active-thumb' : ''}>
                            <img src={item} alt={`thumb ${index}`} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default ProductImagesSlider;
