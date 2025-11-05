import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const slides = [{src: "https://images.unsplash.com/photo-1622576890453-8e50b6f7d5b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9ydGElMjBuaSVDMyVCMW9zfGVufDB8fDB8fHww",alt:"Torta Colorida"},
                {src:"https://images.unsplash.com/photo-1585850317906-46d08f28289e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9ydGElMjBnbGFzZWFkb3xlbnwwfHwwfHx8MA%3D%3D", alt:"Torta Blanca"},
                {src:"https://plus.unsplash.com/premium_photo-1716398897690-8ff3b2d3511f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9ydGElMjBmcnV0YWx8ZW58MHx8MHx8fDA%3D", alt:"Torta Frutal"}];

function Slider() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="rounded-lg shadow-lg">

           {slides.map((s, i) => (
                <SwiperSlide key={i}>
                    <div className="w-full h-[300px]">
                        <img src={s.src} alt={s.alt} className="w-full h-full object-contain" />
                    </div>
                </SwiperSlide>
              ))}
        </Swiper>   
        </div>);
}

export default Slider;
