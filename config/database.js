const {Sequelize} =require("sequelize") ;
const sequelize =new Sequelize("maydatabase","root","root",{
    post:"localhost",dialect:'mysql'
});
sequelize.authenticate()
.then(()=>console.log("database Connected"))
.catch(error=> console.log(error,"connecting error"));

module.exports=sequelize