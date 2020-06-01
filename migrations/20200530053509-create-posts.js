'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER , 
        references:{
          model:'Categories' , 
          key : 'id'
        } , 
        onDelete: 'cascade'
      },
      title: {
        type: Sequelize.STRING , 
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING , 
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER , 
        references:{
          model:'Users' , 
          key : 'id'
        }
      },
      slug: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};