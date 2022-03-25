module.exports = (sequelize,DataType) =>{
    const womenProduct = sequelize.define("Womenware",{
        p_name:{
            type:DataType.STRING,
            allowNull:false,
        },
        b_name:{
            type:DataType.TEXT,
            allowNull:false,
        },
        p_price:{
            type:DataType.INTEGER,
            allowNull:false,
        },
        p_color:{
            type:DataType.TEXT,
            allowNull:false,
        },
        p_size:{
            type:DataType.TEXT,
            allowNull:false,
        },
        descp:{
            type:DataType.TEXT,
            allowNull:false,
            defaultValue:"info about product",
        },
        p_img:{
            type:DataType.BLOB('medium'),
            allowNull:false,
        },
    },{timestamps:false})
    return womenProduct;
}