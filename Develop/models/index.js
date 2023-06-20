// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  onDelete: 'SET NULL'
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  onDelete: 'SET NULL'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
