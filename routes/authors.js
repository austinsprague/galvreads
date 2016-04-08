const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Authors() {
  return knex('Authors');
}
