"use client"
import animation from "../../assets/animations/aboutUsAnimation.gif"
import { Container, Fade, Box, Typography, Card, CardContent } from "@mui/material"
import { useLanguage } from "../../contexts/LanguageContext"

const About = () => {
  const { t } = useLanguage()

  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: 10,
        px: 2,
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(46, 125, 50, 0.1) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <Fade in={true} timeout={1000}>
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: "7xl", pb: 5, mx: "auto" }}>
            <Box
              sx={{
                display: { lg: "grid", md: "block" },
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
                alignItems: "center",
              }}
            >
              {/* Animation */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  order: { lg: 2, md: 1 },
                  animation: "floatAnimation 6s ease-in-out infinite",
                  "@keyframes floatAnimation": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "120%",
                      height: "120%",
                      background: "radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, transparent 70%)",
                      borderRadius: "50%",
                      animation: "pulse 3s ease-in-out infinite",
                      zIndex: -1,
                    },
                  }}
                >
                  <img
                    style={{
                      height: "auto",
                      maxHeight: "30rem",
                      width: "100%",
                      maxWidth: "28rem",
                      borderRadius: "20px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      filter: "drop-shadow(0 10px 20px rgba(76, 175, 80, 0.3))",
                    }}
                    src={animation || "/placeholder.svg"}
                    alt="about_us"
                  />
                </Box>
              </Box>

              {/* Content */}
              <Box
                sx={{
                  order: { lg: 1, md: 2 },
                  animation: "slideInFromLeft 1s ease-out",
                  "@keyframes slideInFromLeft": {
                    "0%": { transform: "translateX(-100%)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                  },
                }}
              >
                <Card
                  elevation={6}
                  sx={{
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    borderRadius: "24px",
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    {/* Decorative elements */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 100,
                        height: 100,
                        background: "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.1))",
                        borderRadius: "50%",
                        animation: "rotate 20s linear infinite",
                        "@keyframes rotate": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />

                    {/* Title */}
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #2e7d32, #4caf50)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 4,
                        animation: "titleGlow 3s ease-in-out infinite alternate",
                        "@keyframes titleGlow": {
                          "0%": { filter: "brightness(1)" },
                          "100%": { filter: "brightness(1.2)" },
                        },
                      }}
                    >
                      {t("about.title")}
                    </Typography>

                    {/* Content paragraphs with staggered animation */}
                    <Box sx={{ space: 4 }}>
                      {[
                        t("about.content1"),
                        t("about.content2"),
                        t("about.content3"),
                        t("about.content4"),
                        t("about.content5"),
                      ].map((content, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{
                            textAlign: "justify",
                            lineHeight: 1.8,
                            color: "text.secondary",
                            mb: 3,
                            animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                            "@keyframes fadeInUp": {
                              "0%": { transform: "translateY(30px)", opacity: 0 },
                              "100%": { transform: "translateY(0)", opacity: 1 },
                            },
                            "&:hover": {
                              color: "text.primary",
                              transition: "color 0.3s ease",
                            },
                          }}
                        >
                          {content}
                        </Typography>
                      ))}
                    </Box>

                    {/* Decorative bottom element */}
                    <Box
                      sx={{
                        mt: 4,
                        height: 4,
                        background: "linear-gradient(90deg, #2e7d32, #4caf50, #81c784)",
                        borderRadius: 2,
                        animation: "gradientShift 3s ease-in-out infinite",
                        "@keyframes gradientShift": {
                          "0%, 100%": { backgroundPosition: "0% 50%" },
                          "50%": { backgroundPosition: "100% 50%" },
                        },
                        backgroundSize: "200% 200%",
                      }}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Container>
      </Fade>
    </Box>
  )
}

export default About
