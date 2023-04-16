const express = require("express");
const cors = require("cors");
const GlobalErrorHandler = require("./middleware/errorHandling")

const genreRouter = require("./controller/genre-controller");
const videoRouter = require("./controller/video-controller");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/genres", genreRouter);
app.use("/videos", videoRouter)
app.get("/health", (req, res) => {
    res.send("Running");
})

app.use(GlobalErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});