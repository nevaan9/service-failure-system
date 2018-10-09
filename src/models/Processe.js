// Create a Process Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcessSchema = new Schema({
  name: String,
  members: Array,
});

const Process = mongoose.model('Processes', ProcessSchema);
module.exports = Process;
