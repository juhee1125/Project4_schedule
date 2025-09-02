require('dotenv').config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());

const apiToken = process.env.CALENDAR_API_TOKEN;

app.post("/api/classify", async (req, res) => {
  console.log(req.body)
  try {
    console.log("try문")
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );
    if (!response.ok) {
      // 에러 응답일 경우 HTML이나 텍스트 그대로 반환
      const text = await response.text();
      console.error("API 에러 응답:", text);
      return res.status(response.status).send({ error: text });
    }

    const data = await response.json();
    res.json(data);
    console.log("API 정상 응답:", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8081, () => console.log("Server running on 8081"));
