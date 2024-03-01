const { DataTypes } = require('sequelize');

function createOneToMany(parent, child) {
    const parentKey = parent.key;
    const childKey = child.key;
    parent.model.hasMany(child.model, { foreignKey: { name: parentKey, type: DataTypes.UUID } });
    child.model.belongsTo(parent.model, { foreignKey: { name: childKey, type: DataTypes.UUID } })
}
function createManyToMany(model1, model2, junction) {
    const parentKey = model1.key;
    const childKey = model2.key;
    model1.model.belongsToMany(model2.model, { through: junction, foreignKey: { name: parentKey, type: DataTypes.UUID }});
    model2.model.belongsToMany(model1.model, { through: junction, foreignKey: { name: childKey, type: DataTypes.UUID }});
}

module.exports = {
    createOneToMany,
    createManyToMany
}
