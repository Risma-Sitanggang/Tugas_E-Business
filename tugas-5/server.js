// Import library
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // agar bisa baca body JSON

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

// === CREATE (POST) ===
// Endpoint: POST /users
app.post('/users', async (req, res) => {
  try {
    const newUser = req.body; // ambil data dari body request
    const response = await axios.post(BASE_URL, newUser);

    res.status(201).json({
      message: 'User created successfully',
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create user',
      error: error.message,
    });
  }
});

// === DELETE (DELETE) ===
// Endpoint: DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await axios.delete(`${BASE_URL}/${userId}`);

    res.status(200).json({
      message: `User with ID ${userId} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message,
    });
  }
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});