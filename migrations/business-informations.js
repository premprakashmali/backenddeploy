
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('business_informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      business_id: {
        type: Sequelize.UUID,  // UUID type
        defaultValue: Sequelize.UUIDV4,  // Auto-generate UUID
        allowNull: false,
        unique: true
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
      business_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      business_pan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

      },
      business_gstn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

      },
      business_logo_file: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

      },
      business_proof_file: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

      },
      is_consent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('business_informations');
  }
};