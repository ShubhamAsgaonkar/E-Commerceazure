module.exports = (sequelize,DataType) =>{
    const Customizer = sequelize.define("Customizer",{
        Id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false
        },
        c_name:{
            type:DataType.STRING,
            allowNull:false,
        },
        c_size:{
            type:DataType.STRING,
            allowNull:false,
        },
        c_type:{
            type:DataType.STRING,
            allowNull:false,
        },
        c_color:{
            type:DataType.STRING,
            allowNull:false,
        },
        c_image:{
            type:DataType.BLOB('long'),
            allowNull:false,
        }
    }
    ,{timestamps:false})
    return Customizer;
}