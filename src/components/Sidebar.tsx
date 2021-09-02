import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

interface SidebarProps {
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
}

export default function Sidebar(props: SidebarProps) {

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
        </Typography>
      </Paper>
    </Grid>
  );
}
