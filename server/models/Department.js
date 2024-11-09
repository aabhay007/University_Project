import mongoose from "mongoose";
const DepartmentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    uniId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"university"},
},
    {timestamps:true}
);
const DepartmentModel=mongoose.model('department',DepartmentSchema);
export default DepartmentModel;