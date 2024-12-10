// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express();
const PORT = 5555;
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hoverAnalytics', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const HoverSchema = new mongoose.Schema({
    duration: Number,
    timestamp: { type: Date, default: Date.now }
});
const HoverData = mongoose.model('HoverData', HoverSchema);
// API to receive hover data
app.post('/api/hover', async (req, res) => {
    try {
        const { duration } = req.body;
        const hoverData = new HoverData({ duration });
        await hoverData.save();
        res.status(201).json({ message: 'Hover data saved', data: hoverData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});
// API to fetch hover data
app.get('/api/hover', async (req, res) => {
    try {
        const data = await HoverData.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});