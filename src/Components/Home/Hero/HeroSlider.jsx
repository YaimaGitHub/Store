"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Button, Container, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"
import ful_kopi from "../../../assets/icons/ful_kopi_icon.png"

// Importar imágenes para el slider
import Hero_bg1 from "../../../assets/backgrounds/1_bg.png"
import Hero_bg2 from "../../../assets/backgrounds/2_bg.png"
import hero_customer from "../../../assets/hero_customer.png"

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useLanguage()
  const navigate = useNavigate()
  const isMediumScreen = useMediaQuery("(max-width: 1024px)")

  // Imágenes para el slider
  const sliderImages = [
    {
      id: 1,
      background: Hero_bg1,
      image: hero_customer,
    },
    {
      id: 2,
      background: Hero_bg2,
      image: hero_customer,
    },
  ]

  return (
    <section className="pt-16 relative">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="heroSwiper"
      >
        {sliderImages.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="min-h-[80vh] flex items-center"
              style={{
                backgroundImage: `url(${slide.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Container>
                <div className="sm:grid sm:grid-cols-2 flex flex-col gap-x-5">
                  {/* Text */}
                  <div className="col pt-3.5 flex items-center">
                    <div className="xl:space-y-7 lg:space-y-6 md:space-y-4 sm:space-y-4 space-y-5 w-11/12 sm:tracking-normal tracking-wide">
                      {/* title */}
                      <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-3xl font-bold capitalize xl:tracking-wide">
                        {t("hero.title")} <br />
                        <div className="xl:my-2.5 lg:my-1.5 sm:my-0 md:my-0.5 my-1">
                          {t("hero.subtitle")} <span className="text-green-500"></span>
                        </div>
                        <img
                          className="inline xl:h-11 md:h-7 h-6"
                          src={ful_kopi || "/placeholder.svg"}
                          alt="vegetable"
                        />
                      </h1>
                      {/* description */}
                      <p className="lg:text-base md:text-sm sm:text-xs text-sm">{t("hero.description")}</p>

                      {/* Shop_now Btn */}
                      <Button
                        onClick={() => navigate("/products")}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        size={isMediumScreen ? "medium" : "large"}
                        color="success"
                      >
                        {t("hero.shopNow")}
                      </Button>
                    </div>
                  </div>

                  {/* Hero Img */}
                  <div className="col">
                    <img
                      className="xl:h-[30rem] lg:h-[26.5rem] md:h-[19rem] ms-auto h-[17rem]"
                      src={slide.image || "/placeholder.svg"}
                      alt="hero_customer"
                    />
                  </div>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSlider
