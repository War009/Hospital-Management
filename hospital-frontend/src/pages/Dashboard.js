import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem
} from "@mui/material";
import API from "../services/api";
import { getRole, getToken, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const role = getRole();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    patientName: "",
    doctor: "",
    date: "",
    time: ""
  });

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "user"
  });

  // ================= FETCH DATA =================

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    if (role !== "admin") return;
    try {
      const res = await API.get("/users", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchUsers();
  }, []);

  // ================= ACTIONS =================

  const handleAddAppointment = async () => {
    await API.post("/appointments", form, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    setForm({ patientName: "", doctor: "", date: "", time: "" });
    fetchAppointments();
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await API.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = async () => {
    await API.post("/users", newUser, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    setNewUser({ username: "", password: "", role: "user" });
    fetchUsers();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ================= UI =================

  return (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", p: 4 }}>
    {/* ================= HEADER ================= */}
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <Typography variant="h4" fontWeight="bold">
        {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </Typography>

      <Button variant="outlined" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>

    {/* ================= APPOINTMENTS ================= */}
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 2,
        boxShadow: 2
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Appointments
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f0f2f5" }}>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Patient</b></TableCell>
            <TableCell><b>Doctor</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Time</b></TableCell>
            {role === "admin" && <TableCell><b>Actions</b></TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {appointments.map((a) => (
            <TableRow key={a._id} hover>
              <TableCell>{a._id}</TableCell>
              <TableCell>{a.patientName}</TableCell>
              <TableCell>{a.doctor}</TableCell>
              <TableCell>{a.date}</TableCell>
              <TableCell>{a.time}</TableCell>

              {role === "admin" && (
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    variant="outlined"
                    onClick={() => handleDeleteAppointment(a._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    {/* ================= USER CREATE APPOINTMENT ================= */}
    {role === "user" && (
      <Box
        mt={4}
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 2
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Create Appointment
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Patient Name"
            value={form.patientName}
            onChange={(e) =>
              setForm({ ...form, patientName: e.target.value })
            }
          />

          <TextField
            label="Doctor"
            value={form.doctor}
            onChange={(e) =>
              setForm({ ...form, doctor: e.target.value })
            }
          />

          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <TextField
            label="Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
          />

          <Button
            variant="contained"
            sx={{ px: 4 }}
            onClick={handleAddAppointment}
          >
            Add
          </Button>
        </Box>
      </Box>
    )}

    {/* ================= ADMIN ADD USER ================= */}
    {role === "admin" && (
      <Box
        mt={4}
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 2
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Add User
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
          <TextField
            label="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />

          <TextField
            label="Password"
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <TextField
            select
            label="Role"
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button
            variant="contained"
            sx={{ px: 4 }}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>

        {/* ================= USER LIST ================= */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          All Users
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f2f5" }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Username</b></TableCell>
              <TableCell><b>Role</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id} hover>
                <TableCell>{u._id}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    )}
  </Box>
);

};

export default Dashboard;

