import Joi from 'joi';

export const boardValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(100).required().messages({
            'string.empty': 'Board title cannot be empty',
            'string.max': 'Board title cannot exceed 100 characters'
        }),
        backgroundLink: Joi.string()
            .required()
            .messages({
                'string.empty': 'Please select a background',
                'any.required': 'Background is required'
            }),
        isImage: Joi.boolean().default(false)
    });

    return schema.validate(data, { abortEarly: false });
};
