const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/dataareacollection",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("success")

}).catch((err)=>{
    console.log("error")
})