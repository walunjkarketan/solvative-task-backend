const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const rewardsRoutes = require('./routes/rewards');

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/rewards', rewardsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
