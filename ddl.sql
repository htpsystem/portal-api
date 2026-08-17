DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('employee','admin')),
    department VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS shifts;
CREATE TABLE IF NOT EXISTS shifts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS attendance_logs;
CREATE TABLE IF NOT EXISTS attendance_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    shift_id INT REFERENCES shifts(id) ON DELETE CASCADE,
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    gps_location VARCHAR(100),
    status VARCHAR(20) CHECK (status IN ('on-time','late','missed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS exceptions;
CREATE TABLE IF NOT EXISTS exceptions (
    id SERIAL PRIMARY KEY,
    log_id INT REFERENCES attendance_logs(id) ON DELETE CASCADE,
    reason VARCHAR(255),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS leave_requests;
CREATE TABLE IF NOT EXISTS leave_requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending','approved','rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP INDEX IF EXISTS idx_users_email;
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

DROP INDEX IF EXISTS idx_shifts_user;
CREATE INDEX IF NOT EXISTS idx_shifts_user ON shifts(user_id);

DROP INDEX IF EXISTS idx_attendance_user;
CREATE INDEX IF NOT EXISTS idx_attendance_user ON attendance_logs(user_id);

DROP INDEX IF EXISTS idx_attendance_shift;
CREATE INDEX IF NOT EXISTS idx_attendance_shift ON attendance_logs(shift_id);

DROP INDEX IF EXISTS idx_leave_user;
CREATE INDEX IF NOT EXISTS idx_leave_user ON leave_requests(user_id);

