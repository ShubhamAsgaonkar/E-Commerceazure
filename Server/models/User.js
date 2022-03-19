module.exports = (sequelize,DataType) =>{
    const Register = sequelize.define("regs",{
        Id:{
            type:DataType.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type: DataType.STRING,
            allowNull: false,
        },
        password:{
            type: DataType.STRING,
            allowNull: false,
        },
        email:{
            type:DataType.STRING,
            allowNull:false
        },
        address:{
            type:DataType.TEXT,
            allowNull:false,
        },
        phone:{
            type:DataType.BIGINT,
            allowNull:false,
        },
        role:{
            type:DataType.STRING,
            default:"user",
        }
    },{timestamps:false})
    return Register
}