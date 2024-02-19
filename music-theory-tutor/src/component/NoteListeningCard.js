import { Container } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';

const NoteListeningCard = () => {
    const { state } = useLocation();
    const { id, scale } = state;

  return (
    <Container maxWidth="md">
        <h1>Note Listening</h1>
        <h3>{id + scale}</h3>
    </Container>
  )
}

export default NoteListeningCard