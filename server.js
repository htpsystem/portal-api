const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const shiftRoutes = require('./routes/shifts');
const attendanceRoutes = require('./routes/attendance');
const exceptionRoutes = require('./routes/exceptions');
const leaveRoutes = require('./routes/leave');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/shifts', shiftRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/exceptions', exceptionRoutes);
app.use('/leave', leaveRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
