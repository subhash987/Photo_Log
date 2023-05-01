// importing required resources

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


// Defining syntax of the component to display
interface Image {
  id: number;
  url: string;
  heading: string;
  details: string;
}

// Adding images
const images: Image[] = [
  {
    id: 1,
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    heading: 'Image 1',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    url: 'https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_960_720.jpg',
    heading: 'Image 2',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    url: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_960_720.jpg',
    heading: 'Image 3',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 4,
    url: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_960_720.jpg',
    heading: 'Image 4',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  // We can add more images here...
];


// Creating functions to define how app should work
const CatalogViewer: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  const currentImage = images[currentImageIndex];

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePlayPause = () => {
    setIsSlideshowActive((prevValue) => !prevValue);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isSlideshowActive) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSlideshowActive]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };


  // Creating the interface for users to see
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#e2e2e2"
      paddingX={2}
    >
      <Box maxWidth="1200px" width="100%">
        <Box display="flex" p={2} borderRadius="25px" bgcolor="#ffffff">
          <Box flexShrink={0} width="50%" mr={2}>
            <img
              src={currentImage.url}
              alt={currentImage.details}
              style={{ width: '100%', borderRadius: '25px' }}
            />
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h5" gutterBottom>
            {currentImage.heading}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {currentImage.details}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" onClick={handlePrevious}>
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handlePlayPause}>
            {isSlideshowActive ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
          <Button variant="outlined" onClick={handleNext}>
            Next
          </Button>
        </Box>
        <Box mt={2}>
        <Grid container spacing={1} justifyContent="center">
              {images.map((image, index) => (
                <Grid item key={image.id}>
                  <img
                    src={image.url}
                    alt={image.details}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      width: '90px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      filter: index === currentImageIndex ? 'none' : 'grayscale(100%)',
                      cursor: 'pointer',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
  );
};

export default CatalogViewer;