// Create a Service Failure Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceFailureSchema = new Schema({
  name: String,
  email: String,
  description: String,
  failedProcess: Object,
  sentTo: Array
});

const ServiceFailure = mongoose.model('ServiceFailure', ServiceFailureSchema);
module.exports = ServiceFailure;
