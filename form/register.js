require('dotenv').config()
const mongoose = require("mongoose")
const bcrypt=require('bcrypt')
const SALT_WORK_FACTOR = 10;
const jwt=require('jsonwebtoken');
const { error } = require("console");
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        required: true,
        type: String
    },
    fathername: {
        required: true,
        type: String
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type:String,
    },
    cityname: {
        type: String
    },
    statename: {
        type: String
    },
    gender: {
        type: String
    },
    yes: {
        type: String
    },
    tokens:[
        {
        token:{
            type: String,
            required:true
        }
        
    }
]
})

// UserSchema.methods.generateAuthToken=async function(){

//     try {
//         // console.loh(this._id);
//         const token=jwt.sign({_id:this._id.toString()},"mynameisprinceyadheisagoodpersonalsoagood")
//         this.tokens=this.tokens.concat({token:token})
//         await this.save();
//         return token;
//     } catch (e) {

//         console.log("the err part is"+error)
//     }
// }
 UserSchema.methods.generateAuthToken=async function (){

        try {
            // console.loh(this._id);
            let token= jwt.sign({_id: this._id}, process.env.SECRET_KEY)
            this.tokens=this.tokens.concat({token: token})
            await this.save();
            return token;
        } catch (e) {
    
            console.log("the err part is"+error)
        }
    }

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const Register = new mongoose.model("Register", UserSchema)
module.exports = Register;


