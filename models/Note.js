const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: false,
    },
    lastModified: {
        type: Date,
        required: true,
    },
})

const Note = model('note', NoteSchema)

module.exports = Note