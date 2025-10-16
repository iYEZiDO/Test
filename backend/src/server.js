import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const products = [
  {
    id: "insight-hub",
    name: "Insight Hub",
    category: "Analytics",
    headline: "360° Dashboard für Echtzeit-Analysen"
  },
  {
    id: "flow-automator",
    name: "Flow Automator",
    category: "Automation",
    headline: "Workflows ohne Code orchestrieren"
  }
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", (_req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Backend ready on http://localhost:${port}`);
});
