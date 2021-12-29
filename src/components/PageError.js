import React from "react";
import { Box, Button, Container, Typography } from '@mui/material';
import Link from "@mui/material/Link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotFoundPic from '../assets/undraw_page_not_found_su7k.svg';

function PageError() {
  return (
  <>
   <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
            fontSize="60px"
          >
            404: The page you are looking for isn’t here
          </Typography>
         
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="404 not found"
              src={NotFoundPic}
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
           <Link href="/" underline="none">
            <Button
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              sx={{ mt: 3 }}
              variant="contained"
           
              style={{backgroundColor:"yellow" ,color:"black"}}
            >
              Go back to main
            </Button>
        </Link>
        </Box>
      </Container>
    </Box>
  </>);
}

export default PageError;
