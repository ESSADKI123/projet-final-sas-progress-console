import {apprenants} from './data.js';

export function normalisernom(nom) {
    return nom.trim().toLowerCase();
}
export function validerResultat(jour, exercicesTermines, totalExercices,) {
    if (jour < 1 || jour > 7) {
        return false;
    }

    if (exercicesTermines > totalExercices) {
        return false;
    }

    if ( exercicesTermines < 0 || totalExercices < 0){
        return false; 
    }
    return true;
}
export function ajouterApprenant ( nomComplet, ville){
 for ( let i of apprenants)
    if (nomComplet === i.nomComplet)
        return false ; 

let newStudent = {
    id : apprenants.length + 1, 
    nomcomplet : nomComplet,
    ville : ville,
    resultats : []
}
apprenants.push(newStudent)
        return true 
}