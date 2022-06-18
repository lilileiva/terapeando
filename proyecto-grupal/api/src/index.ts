import app from "./app";
import connectDB from "./db";

try {
    app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
    connectDB()
} catch (error) {
    console.error(error)
}
