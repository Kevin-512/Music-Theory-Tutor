import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const TitleGrid = (props) => {
  return (
    <Container
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: props.color,
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${props.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={props.image} alt={props.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom style={{ fontFamily: 'Noto Serif, serif' }}>
              {props.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph style={{ fontFamily: 'Noto Serif, serif' }}>
              {props.description}
            </Typography>

          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TitleGrid