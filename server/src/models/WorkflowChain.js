const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkflowChain = sequelize.define('WorkflowChain', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  actions: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidActions(value) {
        if (!Array.isArray(value)) {
          throw new Error('Actions must be an array');
        }
        for (const action of value) {
          if (!action.type || !['weather', 'github', 'news'].includes(action.type)) {
            throw new Error('Invalid action type');
          }
        }
      }
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  executionCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastExecuted: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'workflow_chains',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['name']
    }
  ]
});

module.exports = WorkflowChain;