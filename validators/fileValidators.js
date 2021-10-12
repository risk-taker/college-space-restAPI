import Joi from "joi";

const fileSchema = Joi.object({
    notes_name: Joi.string().required(),
    desc: Joi.string().required(),
    teacher_name: Joi.string().required(),
    myfile: Joi.string()
})


export default fileSchema;