import { Container } from '@mui/material'
import React from 'react'
import TitleGrid from '../component/TitleGrid'

const NoteListening = () => {
  return (
    <Container maxWidth="md">
        <TitleGrid
        title={"Note Listening"}
        image={
          "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        imageText={"main image description"}
        color={"#dfc920"}
      />
    </Container>
  )
}

export default NoteListening