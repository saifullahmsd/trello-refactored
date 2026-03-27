import Joi from 'joi';

export const createCardValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(250).required().messages({ 'string.empty': 'Card title cannot be empty' }),
        listId: Joi.string().hex().length(24).required(),
        boardId: Joi.string().hex().length(24).required()
    });
    return schema.validate(data, { abortEarly: false });
};

export const updateCardValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(250).optional(),
        description: Joi.string().allow('').optional(),

        labels: Joi.array().items(
            Joi.object({
                _id: Joi.string().hex().length(24).optional(),
                text: Joi.string().allow(''),
                color: Joi.string().required()
            })
        ).optional(),

        checklists: Joi.array().items(
            Joi.object({
                _id: Joi.string().hex().length(24).optional(),
                title: Joi.string().required(),
                items: Joi.array().items(
                    Joi.object({
                        _id: Joi.string().hex().length(24).optional(),
                        text: Joi.string().required(),
                        completed: Joi.boolean().default(false)
                    })
                ).default([])
            })
        ).optional(),

        date: Joi.object({
            startDate: Joi.date().allow(null).optional(),
            dueDate: Joi.date().allow(null).optional(),
            dueTime: Joi.string().allow(null).optional(),
            completed: Joi.boolean().optional()
        }).optional(),

        cover: Joi.object({
            color: Joi.string().allow(null).optional()
        }).optional(),

        members: Joi.array().items(Joi.string().hex().length(24)).optional(),
        attachments: Joi.array().optional()
    });

    return schema.validate(data, { abortEarly: false });
};

export const moveCardValidator = (data) => {
    const schema = Joi.object({
        destinationListId: Joi.string().hex().length(24).required(),
        newOrder: Joi.number().min(0).required()
    });
    return schema.validate(data, { abortEarly: false });
};
