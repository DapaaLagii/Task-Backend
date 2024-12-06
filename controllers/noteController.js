const NoteModel = require('../models/noteModel');

class NoteController {
  static async createNote(req, res) {
    try {
      const { title, note } = req.body;
      if (!title || !note) {
        return res.status(400).json({ message: 'Judul dan catatan harus diisi' });
      }
      const noteId = await NoteModel.createNote(title, note);
      res.status(201).json({ 
        message: 'Catatan berhasil dibuat', 
        noteId 
      });
    } catch (error) {
      res.status(500).json({ message: 'Gagal membuat catatan', error: error.message });
    }
  }


  static async getAllNotes(req, res) {
    try {
      const notes = await NoteModel.getAllNotes();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil catatan', error: error.message });
    }
  }


  static async getNoteById(req, res) {
    try {
      const { id } = req.params;
      const note = await NoteModel.getNoteById(id);
      if (!note) {
        return res.status(404).json({ message: 'Catatan tidak ditemukan' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil catatan', error: error.message });
    }
  }


  static async updateNote(req, res) {
    try {
      const { id } = req.params;
      const { title, note } = req.body;
      if (!title || !note) {
        return res.status(400).json({ message: 'Judul dan catatan harus diisi' });
      }
      const updated = await NoteModel.updateNote(id, title, note);
      if (!updated) {
        return res.status(404).json({ message: 'Catatan tidak ditemukan' });
      }
      res.status(200).json({ message: 'Catatan berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal memperbarui catatan', error: error.message });
    }
  }


  static async deleteNote(req, res) {
    try {
      const { id } = req.params;
      const deleted = await NoteModel.deleteNote(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Catatan tidak ditemukan' });
      }
      res.status(200).json({ message: 'Catatan berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menghapus catatan', error: error.message });
    }
  }
}

module.exports = NoteController;