import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setPhotoToActiveNote, setSaving, updateNote } from "./journalSlice";
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers';

export const StartNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());
        
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote)); 
        dispatch(setActiveNote(newNote));
    }
}

export const StartSaveNote = (note) => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));
    }
}

export const StartUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        
        // await fileUpload(files[0]);

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        // await Promise.all(fileUploadPromises)
        //     .then((urls) => {
        //         console.log(urls);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

        const photoUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotoToActiveNote(photoUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}