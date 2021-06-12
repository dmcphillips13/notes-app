import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editing, setEditing] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  const handleInput = (ev) => {
    if (ev.target.className === 'newNote') {
      setNewNote(ev.target.value);
    } else if (ev.target.className === 'editNote') {
      setEditNote(ev.target.value);
    }
  };

  const handleSelect = (ev, idx) => {
    if (!ev.target.className.includes('button')) {
      if (selected === undefined) {
        setSelected(idx);
      } else if (selected === idx) {
        setSelected(undefined);
      } else {
        let temp = notes[selected];
        notes[selected] = notes[idx];
        notes[idx] = temp;
        setSelected(undefined);
      }
    }
  };

  const handleEdit = (note, idx) => {
    setEditing(idx);
    setEditNote(note);
    setSelected(undefined);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (ev.target.className === 'saveNewNote') {
      setNotes([...notes, newNote]);
      setNewNote('');
    } else if (ev.target.className === 'saveEditNote') {
      setNotes([
        ...notes.map((note, idx) => (idx === editing ? editNote : note)),
      ]);
      setEditing(undefined);
      setEditNote('');
    }
  };

  const handleDelete = (idx) => {
    setNotes([...notes.filter((note, _idx) => idx !== _idx)]);
    setSelected(undefined);
    setEditing(undefined);
  };

  return (
    <div className="grid">
      {notes.length < 36 ? (
        <div className="addNote">
          <textarea
            className="newNote"
            placeholder="New note"
            value={newNote}
            onChange={handleInput}
            maxLength="255"
          ></textarea>
          <button className="saveNewNote" onClick={handleSubmit}>
            Add Note
          </button>
        </div>
      ) : (
        ''
      )}
      {notes.map((note, idx) => {
        return idx === editing ? (
          <div key={idx} className="currentNote">
            <textarea
              className="editNote"
              value={editNote}
              onChange={handleInput}
              maxLength="255"
            ></textarea>
            <button className="saveEditNote" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        ) : (
          <div
            key={idx}
            className={`currentNote ${idx === selected ? 'selected' : ''}`}
            onClick={(ev) => handleSelect(ev, idx)}
          >
            <p className="noteText">{note}</p>
            <div className="buttonContainer">
              <button
                className="button edit"
                onClick={() => handleEdit(note, idx)}
              >
                Edit
              </button>
              <button
                className="button delete"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
