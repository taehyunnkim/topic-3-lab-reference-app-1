const connectToDatabase = () => {
    const uri = "mongodb://admin:password@mongo:27017/open-devsecops";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
}


module.exports = connectToDatabase();