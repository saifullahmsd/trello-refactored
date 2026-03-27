import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a board title'],
            trim: true,
            maxLength: [100, 'Board title cannot exceed 100 characters']
        },
        backgroundLink: {
            type: String,
            default: ''
        },
        background: {
            type: String,
            default: '#0079bf'
        },
        isImage: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        description: {
            type: String,
            default: ''
        },
        activity: [
            {
                user: { type: String },
                action: { type: String },
                date: { type: Date, default: Date.now }
            }
        ],


    },
    {
        timestamps: true
    }
);

const Board = mongoose.model('Board', boardSchema);
export default Board;
