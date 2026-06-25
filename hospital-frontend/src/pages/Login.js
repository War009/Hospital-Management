import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate = useNavigate();

  const handleSubmit=async()=>{
    try{
      await login(username,password);
      navigate("/dashboard");
    }catch(err){ setError("Invalid credentials"); }
  };

return (
  <Box
    minHeight="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)"
    }}
  >
    <Box
      sx={{
        width: 380,
        bgcolor: "white",
        p: 4,
        borderRadius: 3,
        boxShadow: 6
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Hospital Login
      </Typography>

      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        mb={3}
      >
        Please login to continue
      </Typography>

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

      {error && (
        <Typography
          color="error"
          variant="body2"
          align="center"
          mt={1}
        >
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          py: 1.2,
          borderRadius: 2
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  </Box>
);

};

export default Login;
