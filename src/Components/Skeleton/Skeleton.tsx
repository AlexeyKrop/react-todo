import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Container from '@mui/material/Container/Container';


export const Skeletons = () => {
  // the count of elements? which we want show to display before initialized
  const data = [1,2,3]
  return (
    <Container fixed>
      <Grid container direction="row"
            alignItems="flex-start">
        {data.map((el, index) => {
          return  <Grid key={index} style={{padding: '20px 0'}}>
            <Paper style={{padding: '20px', marginRight: '10px'}}>
              <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" width={260} height={260}/>
              </Stack>
            </Paper>
          </Grid>
        })}
      </Grid>

    </Container>
  );
}