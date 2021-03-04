const joi = require('@hapi/joi');

const SchemaSignup = joi.object({
  nombre: joi.string().min(6).max(50).required(),
  email: joi
    .string()
    .min(10)
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password:joi.string().min(8).required()
});

const SchemaSignin = joi.object({
    email: joi
    .string()
    .min(10)
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password:joi.required()
});


SchemaCreateProducts = joi.object({
  nombre:joi.string().min(5).max(45).required(),
  categoria:joi.string().min(5).max(45).required(),
  precio:joi.number().required(),
  url:joi.string().required()
});

module.exports = {
    SchemaSignup,
    SchemaSignin,
    SchemaCreateProducts
};