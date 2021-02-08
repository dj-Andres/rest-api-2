const app = require('./app');
const database=require('./database');


const PORT=process.env.PORT || 3050;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });