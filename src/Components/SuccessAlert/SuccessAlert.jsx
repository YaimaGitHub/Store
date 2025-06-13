"use client"
import { Alert, Slide, Snackbar } from "@mui/material"
import { CheckCircle, ShoppingCart } from "@mui/icons-material"

const SuccessAlert = ({ massage, state }) => {
  const [open, setOpen] = state

  // Handle close
  const handleClose = () => setOpen(!open)

  return (
    <Snackbar
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      sx={{
        "& .MuiSnackbar-root": {
          top: "80px !important",
        },
      }}
    >
      <Alert
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: "#16a34a",
          color: "white",
          fontSize: "0.95rem",
          fontWeight: 500,
          alignItems: "center",
          "& .MuiAlert-icon": {
            color: "white",
            fontSize: "1.5rem",
          },
          "& .MuiAlert-action": {
            color: "white",
          },
          boxShadow: "0 8px 32px rgba(22, 163, 74, 0.3)",
          borderRadius: 2,
        }}
        onClose={handleClose}
        severity="success"
        icon={<CheckCircle />}
      >
        <div className="flex items-center space-x-2">
          <ShoppingCart fontSize="small" />
          <span>{massage}</span>
        </div>
      </Alert>
    </Snackbar>
  )
}

// This sub_component will add a slide animation on snackBar
function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

export default SuccessAlert
