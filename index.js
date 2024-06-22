import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs: blogs });
});

app.get("/newForm", (req, res) => {
    res.render("inputForm.ejs");
});

app.post("/blogForm", (req, res) => {
    const newBlog = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    blogs.push(newBlog);
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    blogs = blogs.filter(b => b.id !== req.params.id);
    res.redirect("/");
});

app.listen(port);
