import fetch from "node-fetch";
import axios from "axios";

export const chatWithModel = async (req, res) => {
  const { message, history, model } = req.body;

  const prompt = `
  You are a helpful assistant.
  Give short, clear answers.
  Avoid unnecessary explanation.
  
  ${history || ""}\nuser: ${message}\nassistant:`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "tinyllama",
        prompt,
        stream: true,
        options: {
          num_predict: 200, //limit response lenght
        }
      }),
    });

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    // ✅ Node stream handling
    response.body.on("data", (chunk) => {
      res.write(chunk.toString());
    });

    response.body.on("end", () => {
      res.end();
    });

    response.body.on("error", (err) => {
      console.error("Stream error:", err);
      res.end();
    });

  } catch (error) {
    console.error("Streaming error:", error);
    res.status(500).send("Streaming failed");
  }
};

export const getModels = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:11434/api/tags");

    const rawModels = response.data?.models || [];

    const models = rawModels.map((m) => m.name || m.model);

    res.json(models);

  } catch (err) {
    console.error("Model fetch error:", err.message);
    res.status(500).json([]);
  }
};