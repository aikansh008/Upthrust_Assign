const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkflowRun = sequelize.define('WorkflowRun', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 500]
    }
  },
  action: {
    type: DataTypes.ENUM('weather', 'github', 'news'),
    allowNull: false
  },
  ai_response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  api_response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  final_result: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'workflow_runs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = WorkflowRun;