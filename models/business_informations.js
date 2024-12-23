









'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class business_informations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  }

  business_informations.init({
    business_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
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
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    business_pan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    business_gstn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    business_logo_file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    business_proof_file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_consent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'business_informations',
    underscored: true,
  });

  return business_informations;
};


















