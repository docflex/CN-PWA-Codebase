const express = require("express");
const router = express.Router();
const { fetchCachedData } = require("../services/dataCacheService");

router.get("/data", async (req, res) => {
    try {
        const data = await fetchCachedData();
        res.json(data);
    } catch (err) {
        console.error("API Error:", err);
        res.status(500).send("Error fetching data.");
    }
});

module.exports = router;
