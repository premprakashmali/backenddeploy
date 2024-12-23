'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class business_bank_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association to the User model
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  }

  business_bank_details.init({
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
    account_holder_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ifsc_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    sequelize,
    modelName: 'business_bank_details',
    tableName: 'business_bank_details',
    timestamps: true,
    paranoid: true // Enable soft deletes with the `deleted_at` field
  });

  return business_bank_details;
};
