const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category:  { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  author: { type: String, required: true },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;