const { Router } = require('express')
const Note = require('../../models/Note')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ lastModified: -1 })
        if (!notes) throw new Error('No Todo List found')
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newNote = new Note(req.body)
    try {
        const note = await newNote.save()
        if (!note) throw new Error('Something went wrong saving the note')
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const updateObj = req.body;

    console.log(updateObj);

    try {
        const updated = await Note.findByIdAndUpdate(id, updateObj, { new: true })
        if (!updated) throw Error('Something went wrong')
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Note.findByIdAndDelete(id)
        if (!removed) throw Error('Note not found')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router