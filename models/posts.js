'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    categoryId:{
      type : DataTypes.INTEGER,
      references:{
        model:'Categories' , 
        key : 'id'
      },
      onDelete: 'cascade'

    } ,
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    text:{
      type: DataTypes.STRING,
      allowNull: false
    },
    userId:{
      type : DataTypes.INTEGER,
      references:{
        model:'Users' , 
        key : 'id'
      }
    },
    slug: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Posts.associate = function(models) {
    Posts.belongsTo(models.Categories , {as:'Categories' , foreignKey:'categoryId' ,  onDelete: 'cascade'})
    Posts.belongsTo(models.Users , {as:'Users' , foreignKey:'userId'})
    Posts.belongsToMany(models.Tags , {through: models.TagPost ,  onDelete: 'cascade'})
    // associations can be defined here
  };
  return Posts;
};