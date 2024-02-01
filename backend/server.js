const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));




// Create a connection to the MySQL database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test$$$123',
    database: 'divisin',
});

// Connect to the database
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection immediately
});

app.post('/sign-up', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

    // First, check if the email already exists
    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length > 0) {
            // Email already exists
            return res.status(409).send({ message: "Email already in use, please login or use another email" });
        }

        // Email doesn't exist, create new user
        const [result] = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
        console.log(result);
        res.status(201).send({ message: "User created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error on server side" });
    }
});

app.post('/sign-in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length > 0) {
            // User found, now compare the password
            const isMatch = await bcrypt.compare(password, users[0].password);

            if (isMatch) {
                // Passwords match
                res.send({ message: "Login successful" }); // You might want to send some user data here
            } else {
                // Passwords do not match
                res.status(401).send({ message: "Invalid credentials" });
            }
        } else {
            // No user found with that email
            res.status(404).send({ message: "User not found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error on server side" });
    }
});

app.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        const uploader = req.body.uploader; // ID of the user who uploads the image
        const imagePath = req.file.path; // The path to the stored image

        // Store image information in the 'pictures' table
        await db.query("INSERT INTO images (uploader, image_path, uploaded_at) VALUES (?, ?, NOW())", [uploader, imagePath]);
        res.status(201).send({ message: "Image uploaded successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error uploading image" });
    }
});

app.get('/user-images/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const [images] = await db.query("SELECT * FROM images WHERE uploader = ?", [email]);
        res.status(200).json(images);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error retrieving images" });
    }
});


app.delete('/delete-image/:imageId', async (req, res) => {
    const imageId = req.params.imageId;

    try {
        // First, retrieve the image record to get the file path
        const [images] = await db.query("SELECT * FROM images WHERE id = ?", [imageId]);

        if (images.length > 0) {
            const imagePath = images[0].image_path;

            // Delete the image record from the database
            await db.query("DELETE FROM images WHERE id = ?", [imageId]);

            // Delete the file from the filesystem
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting the image file:", err);
                    return res.status(500).send({ message: "Error deleting the image file" });
                }
                res.send({ message: "Image deleted successfully" });
            });
        } else {
            // No image found with the provided ID
            res.status(404).send({ message: "Image not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting image" });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
