require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Profile = require("./models/Profile");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO =
  process.env.MONGO_URI || "mongodb://localhost:27017/hackathon_demo";
mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo error", err));

// GET /api/profiles?q=react&skills=React,Node.js&minExp=2&page=1&limit=20&sort=exp_desc
app.get("/api/profiles", async (req, res) => {
  try {
    const {
      q,
      skills,
      roles,
      tag,
      minExp,
      maxExp,
      location,
      page = 1,
      limit = 20,
      sort = "relevance",
    } = req.query;

    const filters = {};

    // numeric filters
    if (minExp)
      filters.experienceYears = {
        ...(filters.experienceYears || {}),
        $gte: Number(minExp),
      };
    if (maxExp)
      filters.experienceYears = {
        ...(filters.experienceYears || {}),
        $lte: Number(maxExp),
      };

    // skills / roles filters (comma separated)
    if (skills) {
      const arr = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (arr.length) filters.skills = { $in: arr }; // change to $all if you require all skills
    }
    if (roles) {
      const arr = roles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (arr.length) filters.roles = { $in: arr };
    }
    if (tag) filters.tags = tag;
    if (location) filters.location = { $regex: location, $options: "i" };

    const pageNum = Math.max(1, Number(page));
    const lim = Math.max(1, Number(limit));

    let query;
    let total;

    if (q && q.trim().length) {
      // text search — returns score
      query = Profile.find(
        { $text: { $search: q }, ...filters },
        { score: { $meta: "textScore" } }
      ).sort({
        ...(sort === "exp_desc" ? { experienceYears: -1 } : {}),
        score: { $meta: "textScore" },
      });
    } else {
      // no text search
      const sortObj =
        sort === "exp_desc" ? { experienceYears: -1 } : { createdAt: -1 };
      query = Profile.find(filters).sort(sortObj);
    }

    total = await query.countDocuments();
    const results = await query
      .skip((pageNum - 1) * lim)
      .limit(lim)
      .lean();

    res.json({ total, page: pageNum, limit: lim, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// Simple endpoint to get top skill counts (for filter facets)
app.get("/api/facets/skills", async (req, res) => {
  try {
    const agg = await Profile.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 },
    ]);
    res.json(agg);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
