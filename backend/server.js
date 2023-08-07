import express from 'express';
import products from './data/products.js';
const PORT = 5000;

const app = express();



app.get('/', (req, res) => {
    res.send('APP is running');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((product) => product._id === req.params.id);
    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

