'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('business_platforms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      platform_name: {
        type: Sequelize.STRING,
        allowNull: false, // Platform name is required
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: true, // Logo URL is optional
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), 
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true, 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('business_platforms');
  }
};
