import React from 'react'
import { SvgIconComponent } from '@mui/icons-material';
import { Paper, IconButton, Typography, Box } from '@mui/material';

interface props {
    Icon: SvgIconComponent;
    Heading: string;
    Price: number;
    Desc: string;
    IconColor: string;
}

const IconTemplate: React.FC<props> = ({Icon, Heading, Price, Desc, IconColor }) => {
  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', flexDirection:"column" }}>
        {/* Icon on the left */}
        <Box sx={{display:"flex", alignItems:"center", gap:"2em"}}>
            <Box>
                <IconButton aria-label="icon" sx={{backgroundColor: IconColor, color: "white" }}>
                    <Icon />
                </IconButton>
            </Box>
            {/* Heading and RS on the right */}
            <div style={{ flexGrow: 1, textAlign: 'left', marginRight: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    {Heading}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {`RS ${Price}`}
                </Typography>
            </div>
        </Box>
        {/* Description below */}
        <Typography fontSize={10}>
          {Desc}
        </Typography>
      </Paper>
    </div>
  )
}

export default IconTemplate
