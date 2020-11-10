const mongoose = require("mongoose");

(async () => {
  await mongoose.connect(
    "mongodb+srv://<user>:<pwd>@cluster0.cjquo.mongodb.net/<db>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
})();

const Schema = mongoose.Schema;

const BlogPost = new Schema({
  title: String,
  body: String,
  date: Date,
});

const BlogPostModel = mongoose.model("blospost", BlogPost);

const blogPost = new BlogPostModel({
  title: "titulo2",
  body: "esto es un blog post 222222",
  date: new Date(),
});

(async () => {
  await blogPost.save(); // espera a guardar el documento
  await mongoose.disconnect(); // cierra la conexion
})();
