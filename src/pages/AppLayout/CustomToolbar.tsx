import { useTheme } from '@mui/material'
import React from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'

const CustomToolbarProgress = () => {
    const theme=useTheme();

    TopBarProgress.config({
        barColors: {
          '0': theme.palette.primary.main,
        },
        barThickness: 1,
        shadowBlur: 5,
      })
  return (
    <TopBarProgress />
  )
}

export default CustomToolbarProgress