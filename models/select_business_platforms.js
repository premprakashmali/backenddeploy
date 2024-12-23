

'use strict';
const {
  Model, Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class select_business_platform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here, e.g., associations with the user model
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  }

  select_business_platform.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    selected_platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     platform_logo_url: {
        type: DataTypes.STRING
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
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'), // Automatically updated when row is modified
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true, // For soft deletes
    }
  }, {
    sequelize,
    modelName: 'select_business_platform',
    tableName: 'select_business_platforms',
    timestamps: true,  // Automatically manages created_at, updated_at fields
    paranoid: true,     // Enables soft deletes (deleted_at)
    underscored: true,  // Use snake_case column names (created_at, updated_at)
  });

  return select_business_platform;
};
