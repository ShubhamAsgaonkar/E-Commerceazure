module.exports = (sequelize, DataType) => {
    const Order = sequelize.define("order", {
        Id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataType.INTEGER,
            allowNull: false
        },
        pname: {
            type: DataType.STRING,
            allowNull: false
        },
        pprice:{
            type: DataType.INTEGER,
            allowNull: false
        },
        pimg:{
            type: DataType.BLOB('medium'),
            allowNull: false
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        address:{
            type: DataType.STRING,
            allowNull: false
        },
        payment:{
            type: DataType.STRING,
            allowNull: false
        }
    },{timestamps:false})
    return Order;
}