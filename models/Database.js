const account = {
  user: "admin",
  password: "password",
}

const connectToDatabase = () => {
    const uri = `mongodb://${account.user}:${account.password}@mongo:27017/open-devsecops`;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
}


module.exports = connectToDatabase();