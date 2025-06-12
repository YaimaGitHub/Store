"use client"
import animation from "../../assets/animations/aboutUsAnimation.gif"
import { Container, Fade } from "@mui/material"
import { useLanguage } from "../../contexts/LanguageContext"

const About = () => {
  const { t } = useLanguage()

  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  return (
    <div className=" min-h-screen pt-20 px-2 flex items-center sm:px-6 lg:px-8">
      <Fade in={true}>
        <Container>
          <div className="max-w-7xl pb-5 container mx-auto ">
            <div className="lg:grid md:grid-cols-2">
              {/* Animation */}
              <div className="col flex order-last justify-center">
                <img
                  className="xl:h-[30rem] lg:h-[28rem] md:h-[22rem] h-[17.5rem]"
                  src={animation || "/placeholder.svg"}
                  alt="about_us"
                />
              </div>
              <div className="xl:space-y-7 lg:space-y-5 md:space-y-7 space-y-5 sm:mt-0 sm:px-0">
                {/* Title */}
                <h2 className="xl:text-3xl md:text-3xl lg:text-2xl text-2xl font-semibold text-gray-800">
                  {t("about.title")}
                </h2>
                {/* Article */}
                <p className=" text-justify xl:text-base lg:text-sm md:text-base text-sm text-gray-600">
                  {t("about.content1")}
                  <br />
                  <br />

                  {t("about.content2")}
                  <br />
                  <br />

                  {t("about.content3")}
                  <br />
                  <br />

                  {t("about.content4")}
                  <br />
                  <br />

                  {t("about.content5")}
                </p>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>
        </Container>
      </Fade>
    </div>
  )
}

export default About
