const db = require('../config/database');

class NoteModel {
 
  static async createNote(title, note) {
    const [result] = await db.execute(
      'INSERT INTO notes (title, datetime, note) VALUES (?, NOW(), ?)', 
      [title, note]
    );
    return result.insertId;
  }

 
  static async getAllNotes() {
    const [rows] = await db.execute('SELECT * FROM notes ORDER BY datetime DESC');
    return rows;
  }

  
  static async getNoteById(id) {
    const [rows] = await db.execute('SELECT * FROM notes WHERE id = ?', [id]);
    return rows[0];
  }

  
  static async updateNote(id, title, note) {
    const [result] = await db.execute(
      'UPDATE notes SET title = ?, note = ? WHERE id = ?', 
      [title, note, id]
    );
    return result.affectedRows > 0;
  }

  
  static async deleteNote(id) {
    const [result] = await db.execute('DELETE FROM notes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = NoteModel;