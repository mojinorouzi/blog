'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagPost = sequelize.define('TagPost', {
    tagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  TagPost.associate = function(models) {
    TagPost.belongsTo(models.Posts , {foreignKey:'postId' ,  onDelete: 'cascade'})
    TagPost.belongsTo(models.Tags , {foreignKey:'tagId' ,  onDelete: 'cascade'})
    // associations can be defined here
  };
  return TagPost;
};