import mongoose from "mongoose";

const connectDB = (): void => {
  const url: string = "mongodb+srv://Roshni_Backend:Roshni*123@cluster0.tywv1ez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose.connect(url).then((): void => {
    console.log("Database is connected");
  }).catch((e: Error): void => {
    console.log("Error while connecting to the database", e.message);
  });
};

export { connectDB };
