import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express();

/* TODO: 
1. put port and host in .env/.env_prod and use config
2. Full MVC (mongoose model, exporess server/controller, api view ) with Analystics Package
3. mongo url in .env/.env_prod
*/

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
    pid: String,
    timestamp: { type: Date, default: Date.now }
});
const HoverData = mongoose.model('HoverData', HoverSchema);

const TimeOnPageSchema = new mongoose.Schema({
    pageName: String,
    user: String,
    timeOnPage: Number,
    pid: String,
    timestamp: { type: Date, default: Date.now }
});
const TimeOnPageData = mongoose.model('TimeOnPageData', TimeOnPageSchema);

const ClickDataSchema = new mongoose.Schema({
    element: String,
    x: Number,
    y: Number,
    id: String,
    className: String,
    pageName: String,
    user: String,
    pid: String,
    timestamp: { type: Date, default: Date.now }
});
const ClickData = mongoose.model('ClickData', ClickDataSchema);

// API to receive hover data
app.post('/api/hover', async (req, res) => {
    try {
        const { pageName, user, controlId, duration, pid } = req.body;
        const hoverData = new HoverData({ pageName, user, controlId, duration, pid });
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

        const timeOnPageData = new TimeOnPageData({ pageName, user, timeOnPage, pid });
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

//Clicks Data
app.post('/api/clicks', async (req, res) => {
    try {
        const { element, timestap, x, y, id, className, pageName, user, pid } = req.body;
        const clickData = new ClickData({ element, timestap, x, y, id, className, pageName, user, pid });
        await clickData.save();
        res.status(201).json({ message: 'Click data recorded id:', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record click data' });
    }
});





// TODO: put in .env and use config
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});