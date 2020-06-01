'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name:{
      type : DataTypes.STRING,
      allowNull: false,
      unique : true  
    } ,
    caption:{
      type : DataTypes.STRING ,
      allowNull: false
    } 
  }, {});
  Categories.associate = function(models) {
    Categories.hasMany(models.Posts , {as: 'Posts' , foreignKey: 'categoryId' , onDelete: 'cascade'})
    // associations can be defined here
  };
  return Categories;
};