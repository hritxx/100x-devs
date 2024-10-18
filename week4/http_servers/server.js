const express = require("express");

const app = express();
app.get("/add", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    result: a + b,
  });
});

app.get("/multiply/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  res.json({
    result: a * b,
  });
});

app.listen(4000);
