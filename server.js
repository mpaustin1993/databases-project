const app = require('./config/app')

const PORT = process.env.PORT || 4000
app.listen(PORT, (err) => {
    if (err) throw err;
    console.info(`URL: http://localhost:${PORT}`);
})