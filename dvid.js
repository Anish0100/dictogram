const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://prof.anish@gmail.com:Yaks08089888797@cluster0.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("Dictogram");
  const collection = db.collection("videos");

  app.get('/search', (req, res) => {
    let searchTerm = req.query.searchTerm;
    collection.find({ title: { $regex: searchTerm, $options: 'i' } }).toArray((err, result) => {
      if (err) throw err;
      res.render('search_results', { videos: result });
    });
  });
});
