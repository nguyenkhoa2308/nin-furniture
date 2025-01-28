// import classnames from 'classnames/bind';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import './style.scss';

// import styles from './ProductImagesSlider.module.scss';

// const cx = classnames.bind(styles);

function ProductImagesSlider({ images }) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="wrapper-swiper">
            <Swiper
                loop={false}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: activeImage }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
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
                onSwiper={setActiveImage}
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
                        <SwiperSlide key={index}>
                            <img src={item} alt={`thumb ${index}`} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default ProductImagesSlider;
