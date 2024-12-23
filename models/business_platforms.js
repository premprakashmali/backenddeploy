'use strict';
const {
  Model,
  Sequelize, // Add this import for Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class business_platforms extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  business_platforms.init({
    platform_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Automatically set when inserted
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Automatically set on creation
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') // Automatically updated when row is modified
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true, // For soft deletes
    }
  }, {
    sequelize,
    modelName: 'business_platforms',
    tableName: 'business_platforms', 
    timestamps: false, // Prevent auto-generated timestamps, if you are manually handling createdAt/updatedAt
  });

  return business_platforms;
};
