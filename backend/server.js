const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

