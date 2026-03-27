import Joi from 'joi';

export const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of 2'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters long'
        })
    });

    return schema.validate(data, { abortEarly: false });
};


export const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Password is required'
        })
    });

    return schema.validate(data, { abortEarly: false });
};
