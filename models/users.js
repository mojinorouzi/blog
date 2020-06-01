'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username:{
      type :  DataTypes.STRING,
      allowNull: false,
      unique : true  

    },
    password:{
      type :  DataTypes.STRING,
      allowNull: false,
      unique : true  

    }, 
    email:{
      type :  DataTypes.STRING,
      allowNull: false,
      unique : true  

    },
    phone:{
      type :  DataTypes.STRING,
      allowNull: false,
        

    } 
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Posts , {as: 'Posts' , foreignKey: 'userId'})
    // associations can be defined here
  };
  return Users;
};