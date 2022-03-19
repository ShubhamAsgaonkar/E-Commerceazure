module.exports = (sequelize, DataType) => {
    const Cart = sequelize.define("cart", {
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
        psize:{
            type: DataType.STRING,
            allowNull: false
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },{timestamps:false});

    Cart.associate = (models) => {
        Cart.belongsTo(models.regs, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Cart;
}