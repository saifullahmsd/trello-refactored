import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a card title'],
            trim: true,
            maxLength: [250, 'Card title cannot exceed 250 characters']
        },
        description: {
            type: String,
            trim: true,
            default: ''
        },
        list: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
            required: true
        },
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true
        },
        order: {
            type: Number,
            required: true,
            default: 0
        },

        labels: [
            {
                text: { type: String, default: '' },
                color: { type: String, required: true },
            }
        ],
        checklists: [
            {
                title: { type: String, required: true },
                items: [
                    {
                        text: { type: String, required: true },
                        completed: { type: Boolean, default: false }
                    }
                ]
            }
        ],
        date: {
            startDate: { type: Date, default: null },
            dueDate: { type: Date, default: null },
            dueTime: { type: String, default: null },
            completed: { type: Boolean, default: false }
        },
        attachments: [
            {
                link: { type: String, required: true },
                name: { type: String, default: 'Attachment' },
                date: { type: Date, default: Date.now }
            }
        ],
        cover: {
            color: { type: String, default: null },
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                userName: {
                    type: String,
                    required: true
                },
                text: {
                    type: String,
                    required: true,
                    trim: true
                },
                date: {
                    type: Date,
                    default: Date.now
                },
                edited: {
                    type: Boolean,
                    default: false
                }
            }
        ],
    },
    {
        timestamps: true
    }
);

const Card = mongoose.model('Card', cardSchema);
export default Card;
