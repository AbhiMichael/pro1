import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  IconButton,
  Stack
} from '@mui/material';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function Dashboard() {
  const [currentImage, setCurrentImage] = useState('/windmill.jpg');
  const navigate = useNavigate(); // <-- Hook for navigation

  const items = [
    { name: 'Windmills Loft', percent: 25, color: '#000', up: true, image: '/windmill.jpg' },
    { name: 'Seaview Villa', percent: 18, color: '#888', up: false, image: '/seavieww.jpg' },
    { name: 'Family Villa', percent: 12, color: '#888', up: false, image: '/family.jpg' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 80,
          bgcolor: '#1e1e1e',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
        }}
      >
        <Button sx={{ minWidth: 0 }}><DashboardIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Button sx={{ minWidth: 0 }}><HomeIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
          <Button sx={{ minWidth: 0 }}><LocationOnIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
          <Button sx={{ minWidth: 0 }}><BarChartIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
          <Button
            sx={{ minWidth: 0 }}
            onClick={() => navigate('/data')} // Navigate to data.jsx
          >
            <PeopleIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Button>
          <Button sx={{ minWidth: 0 }}><AnalyticsIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
        </Box>
        <Button sx={{ minWidth: 0 }}><SettingsIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
      </Box>

      {/* Main content continues... */}
      {/* (No changes in main content) */}


      {/* Main Content */}
      <Box sx={{ flex: 1, px: 18, py: 3, overflowY: 'auto' ,}}>
        {/* Header */}
        <Typography variant="h5" fontWeight={600} mb={2}>
          Monitor health of<br />your business
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Control and analyze your data in the easiest way
        </Typography>

        {/* Search & Calendar */}
        <Box sx={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', mb: 3 }}>
          <TextField
            placeholder="Search..."
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              sx: { borderRadius: 3 }
            }}
            sx={{ width: { xs: '100%', sm: 300 }, mb: { xs: 1, sm: 0 } }}
          />
          <IconButton>
            <CalendarTodayIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>

        {/* Grid Sections */}
        <Box sx={{
          display:'flex',
          justifyContent:'space-between'
        }}>       
           <Box sx={{
            flexGrow:1
           }}>
          {/* Left Side */}
          {/* <Grid item xs={12} md={5 }> */}
            <Stack direction="row" spacing={2}>
              {[
                { title: 'Views', count: 31, change: '+3', bg: '#e0c3fc, #8ec5fc' },
                { title: 'Clients', count: 63, change: '+1', bg: '#a1c4fd, #c2e9fb' },
                { title: 'Purchases', count: 10, change: '+1', bg: '#ffffff' },
              ].map((card, i) => (
                <Paper key={i} sx={{
                  flex: 1,
                  p: 8,
                  borderRadius: 3,
                  background: card.bg.includes(',') ? `linear-gradient(135deg, ${card.bg})` : card.bg
                }}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="h4">{card.count}</Typography>
                  <Typography variant="caption">{card.change} last day</Typography>
                </Paper>
              ))}
            </Stack>

            {/* Line Chart */}
            <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={1}>Total profit</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h4" fontWeight={600}>$628.00</Typography>
                <Typography color="gray">income</Typography>
                <Typography color="gray">expense</Typography>
              </Box>
              <Box sx={{ height: 250, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jun', income: 100000, expense: 200000 },
                    { month: 'Jul', income: 400000, expense: 350000 },
                    { month: 'Aug', income: 300000, expense: 250000 },
                    { month: 'Sep', income: 500000, expense: 450000 },
                    { month: 'Oct', income: 700000, expense: 500000 },
                    { month: 'Nov', income: 300000, expense: 200000 },
                    { month: 'Dec', income: 400000, expense: 350000 },
                    { month: 'Jan', income: 350000, expense: 280000 }
                  ]}>
                    <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(val) => `${val / 1000}k`} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#00aeae" strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" stroke="#616164" strokeWidth={2} strokeDasharray="4 2" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          {/* </Grid> */}

         
        </Box>

         {/* Right Side */}
          <Box >
            <Box borderRadius={4} overflow="hidden" mb={3}>
              <img
                src={currentImage}
                alt="Selected"
                style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover' }}
              />
            </Box>

            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Box display="flex" bgcolor="#fbfbfb" borderRadius={8} p={0.5}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#c3ebf4',
                      color: '#333',
                      borderRadius: 6,
                      px: 4,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#333', color: '#fff' }
                    }}
                  >
                    Objects
                  </Button>
                  <Button variant="text" sx={{ color: '#000', px: 3, textTransform: 'none' }}>
                    Relators
                  </Button>
                </Box>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Box>

              <Stack spacing={2}>
                {items.map((item, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentImage(item.image)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      bgcolor: item.color === '#000' ? '#000' : 'transparent',
                      color: item.color === '#000' ? '#fff' : '#000',
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: '0.3s',
                      '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={item.image} />
                      <Typography>{item.name}</Typography>
                    </Box>9
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography>{item.percent}%</Typography>
                      {item.up ? <ArrowDropUpIcon color="success" /> : <ArrowDropDownIcon color="error" />}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Box>
      </Box>
      </Box>
    </Box>
  );
}
