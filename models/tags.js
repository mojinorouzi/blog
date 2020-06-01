'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    name:{
      type :  DataTypes.STRING,
      allowNull: false,
      unique : true  
    },
    slug:{
      type : DataTypes.STRING,
      unique : true
    } 
  }, {});
  Tags.associate = function(models) {
    Tags.belongsToMany(models.Posts , {through: models.TagPost ,  onDelete: 'cascade'})
    // associations can be defined here
  };
  return Tags;
};