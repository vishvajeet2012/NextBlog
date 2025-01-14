const mongoose = require('mongoose');

const connecttodb = async () => {
    try {
        const dbPassword = encodeURIComponent('T6H4kQl7fpL0oC4F'); 
        const mongodbUri = `mongodb+srv://kingofjalore2:${dbPassword}@cluster0.p8ub1.mongodb.net/`;
        await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connecttodb