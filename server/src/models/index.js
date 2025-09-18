const sequelize = require('../config/database');
const { testConnection } = require('../config/database');
const WorkflowRun = require('./WorkflowRun');
const User = require('./User');
const WorkflowChain = require('./WorkflowChain');

// Define associations
User.hasMany(WorkflowRun, { foreignKey: 'userId' });
WorkflowRun.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(WorkflowChain, { foreignKey: 'userId' });
WorkflowChain.belongsTo(User, { foreignKey: 'userId' });

// Initialize database connection
const initDatabase = async () => {
  try {
    await testConnection();
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

module.exports = { 
  WorkflowRun, 
  User,
  WorkflowChain,
  initDatabase,
  sequelize
};