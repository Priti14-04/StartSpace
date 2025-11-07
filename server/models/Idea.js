import {model,Schema} from "mongoose"

const IdeaSchema = new Schema(
    {
    title:{type:String,required:true},
    content:{type:String,required:true},
    status:{type:String,
        default:"draft" ,
        enum:["draft","published","archived"],

    },
    category:{type:String , required:true},
    publishedAt:{type:Date},
    author:{type:Schema.Types.ObjectId, ref:"User",required:true},
    slug:{type:String,required:true,unique:true},
   

},

{
    timestamps:true,
}

);

const Idea = model("Idea",IdeaSchema)

export default Idea;