import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express();

// TODO: put in .env and use config
const PORT = 5555;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// TODO: put in .env and use config
mongoose.connect('mongodb://localhost:27017/BBPrimeAnalytics', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Models... yeah I know, I'll make this more MVC later
const HoverSchema = new mongoose.Schema({
    pageName: String,
    user: String,
    controlId: String,
    duration: Number,
    timestamp: { type: Date, default: Date.now }
});
const HoverData = mongoose.model('HoverData', HoverSchema);

const TimeOnPageSchema = new mongoose.Schema({
    pageName: String,
    user: String,
    timeOnPage: Number,
    timestamp: { type: Date, default: Date.now }
});
const TimeOnPageData = mongoose.model('TimeOnPageData', TimeOnPageSchema);



// API to receive hover data
app.post('/api/hover', async (req, res) => {
    try {
        const { pageName, user, controlId, duration } = req.body;
        const hoverData = new HoverData({ pageName, user, controlId, duration });
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
// Save Time on Page Data
app.post('/api/timeonpage', async (req, res) => {
    console.log("Made it to the server");
    try {
        const { pageName, user, timeOnPage } = req.body;

        const timeOnPageData = new TimeOnPageData({ pageName, user, timeOnPage });
        await timeOnPageData.save();

        console.log(`Time on Page: ${timeOnPage}ms`);
        res.status(201).json({ message: 'Time on page recorded', timeOnPage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record time on page' });
    }
});
// Get Time on Page Data
app.get('/api/timeonpage', async (req, res) => {
    try {
        const data = await TimeOnPageData.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch TimeOnPage data' });
    }
});


// TODO: put in .env and use config
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});