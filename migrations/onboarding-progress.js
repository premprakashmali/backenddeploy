// migrations/XXXXXXXXXXXXXX-create-onboarding-progress.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('onboarding_progress', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      onboarding_status: {
        type: Sequelize.ENUM(
          'select_platform',
          'business_info_pending',
          'bank_details_pending',
          'submission_pending',
          'completed'
        ),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('onboarding_progress');
  }
};
