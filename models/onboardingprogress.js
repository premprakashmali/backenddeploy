'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OnboardingProgress extends Model {
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

  OnboardingProgress.init({
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
    onboarding_status: {
      type: DataTypes.ENUM(
        'select_platform',
        'business_info_pending',
        'bank_details_pending',
        'submission_pending',
        'Completed'
      ),
      allowNull: false,
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
    }
  }, {
    sequelize,
    modelName: 'OnboardingProgress',
    tableName: 'onboarding_progress',  // Explicit table name, adjust it based on your DB conventions
    timestamps: true,  // Sequelize will automatically create `createdAt` and `updatedAt` fields
    paranoid: true,    // Enables soft deletes (i.e., `deletedAt` is used for soft deletes)
    underscored: true  // Ensure the columns use snake_case (e.g., `created_at`, `updated_at`)
  });

  return OnboardingProgress;
};
