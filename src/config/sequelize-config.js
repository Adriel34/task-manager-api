'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/dbconfig.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelNames = [];
const srcDir = path.resolve(__dirname, '..');

function loadModelsRecursively(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      loadModelsRecursively(fullPath);
    } else if (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.endsWith('.model.js') &&
      file.indexOf('.test.js') === -1
    ) {
      try {
        const model = require(fullPath);
        
        if (model.init) {
          model.init(sequelize);
          console.log(`Modelo ${model.name} inicializado.`);
        }
        
        db[model.name] = model;
        modelNames.push(model.name);
      } catch (error) {
        console.error(`Erro ao carregar o modelo ${file}:`, error);
      }
    }
  });
}

loadModelsRecursively(srcDir);

Object.keys(db).forEach(modelName => {
  if (db[modelName] && db[modelName].associate) {
    console.log(`Associando o modelo: ${modelName}`);
    db[modelName].associate(db);
  }
});

console.log('Todos os modelos foram conectados:', modelNames.join(', '));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
