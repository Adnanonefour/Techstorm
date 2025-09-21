require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Profile = require("./models/Profile");

const MONGO =
  process.env.MONGO_URI || "mongodb://localhost:27017/hackathon_demo";

const SKILLS = [
  "React",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "TensorFlow",
  "PyTorch",
  "Rust",
  "Solidity",
  "Hardhat",
  "MongoDB",
  "Postgres",
  "Docker",
  "Kubernetes",
  "Three.js",
  "Unity",
  "UI/UX",
  "Data Science",
  "NLP",
  "Computer Vision",
];
const ROLES = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Data Scientist",
  "ML Engineer",
  "DevOps",
  "Product Manager",
  "Designer",
];
const TAGS = [
  "open-to-collab",
  "looking-for-team",
  "mentor-needed",
  "available",
  "speaker",
  "sponsor-interested",
];

function randPick(arr, min = 1, max = 4) {
  const n = faker.datatype.number({ min, max });
  return faker.helpers.shuffle(arr).slice(0, n);
}

function fakeWallet() {
  // not real private key, just a fake address for demo
  return "0x" + faker.string.hexadecimal({ length: 40 }).replace(/^0x/, "");
}

async function seed(count = 500) {
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");

  await Profile.deleteMany({});
  console.log("Cleared Profile collection");

  const docs = [];
  for (let i = 0; i < count; i++) {
    const skills = randPick(SKILLS, 1, 6);
    const roles = randPick(ROLES, 1, 2);
    const tags = randPick(TAGS, 0, 3);
    const bio =
      faker.lorem.paragraph({ max: 2 }) +
      ` Works with ${skills.join(", ")}. ${
        tags.length ? "Tags: " + tags.join(", ") : ""
      }`;

    docs.push({
      name: faker.person.fullName(),
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      bio,
      skills,
      experienceYears: faker.number.int({ min: 0, max: 15 }),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      roles,
      tags,
      walletAddress: fakeWallet(),
      avatarUrl: faker.image.avatar(),
    });
  }

  await Profile.insertMany(docs);
  console.log(`Seeded ${count} profiles`);
  await mongoose.disconnect();
  console.log("Disconnected");
}

const n = process.argv[2] ? Number(process.argv[2]) : 500;
seed(n).catch((err) => {
  console.error(err);
  process.exit(1);
});
