import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema({
  name: { type: String, require: [true, 'Set name for contact'] },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  favorite: { type: Boolean, default: false },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
},
  { versionKey: false, timestamps: true }
)

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", preUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const Contact = model("contact", contactSchema);

export const addContactSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "missing required name field" }),
  email: Joi.string().required().messages({ "any.required": "missing required email field" }),
  phone: Joi.string().required().messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean()
})

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()
})

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})