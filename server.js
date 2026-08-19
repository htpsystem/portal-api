const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const shiftRoutes = require('./routes/shifts');
const attendanceRoutes = require('./routes/attendance');
const exceptionRoutes = require('./routes/exceptions');
const leaveRoutes = require('./routes/leave');

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/shifts', shiftRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/exceptions', exceptionRoutes);
app.use('/leave', leaveRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
