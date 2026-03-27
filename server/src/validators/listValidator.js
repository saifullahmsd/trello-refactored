import Joi from 'joi';

export const listValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(50).required().messages({
            'string.empty': 'List title cannot be empty',
            'string.max': 'List title cannot exceed 50 characters'
        }),
        boardId: Joi.string().hex().length(24).required().messages({
            'string.empty': 'Valid Board ID is required',
            'string.hex': 'Board ID format is invalid',
            'string.length': 'Board ID format is invalid'
        })
    });

    return schema.validate(data, { abortEarly: false });
};
