const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Настройка Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Добавление времени к имени файла
    },
});

const upload = multer({ storage });

// Эндпоинт для загрузки файлов
app.post('/upload', upload.single('media'), (req, res) => {
    res.json({ url: `http://localhost:${PORT}/${req.file.filename}` });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
