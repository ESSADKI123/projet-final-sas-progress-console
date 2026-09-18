import { apprenants } from './data.js';

export function normalisernom(nom) {
  return nom.trim().toLowerCase();
}

export function validerResultat(jour, exercicesTermines, totalExercices, challengeTerminer) {
    if (jour < 1 || jour > 7) {
        return false;
    }

    if (exercicesTermines > totalExercices) {
        return false;
    }

    if ( exercicesTermines < 0 || totalExercices < 0){
        return false; 
    }
    if (challengeTerminer !== 1 && challengeTerminer !== 0)
        return false
    
    return true;
}

export function ajouterApprenant(nomComplet, ville) {
  if (apprenants.some((apprenant) => apprenant.nomComplet === nomComplet)) {
    return false;
  }

  apprenants.push({
    id: apprenants.length + 1,
    nomComplet,
    ville,
    resultats: []
  });
  return true;
}
export function rechercherapprenant(critere) {
  for (const apprenant of apprenants) {
    if (typeof critere === 'string') {
      if (normalisernom(apprenant.nomComplet).includes(normalisernom(critere))) {
        return apprenant;
      }
    } else if (critere === apprenant.id) {
      return apprenant;
    }
  }
  return null;
}
export function calculerProgression(id) {
  const apprenant = rechercherapprenant(id);
  if (!apprenant || apprenant.resultats.length === 0) {
    return 0;
  }

  const total = apprenant.resultats.reduce((somme, resultat) =>
    somme + (resultat.totalExercices || 0), 0);
  const termines = apprenant.resultats.reduce((somme, resultat) =>
    somme + (resultat.exercicesTermines || 0), 0);
  return total === 0 ? 0 : Math.round((termines / total) * 100);
}
export function afficherApprenants() {
  console.log('=== LISTE DE TOUS LES APPRENANTS ===');
  for (const apprenant of apprenants) {
    const progression = calculerProgression(apprenant.id);
    console.log(
      `ID: ${apprenant.id} | Nom: ${apprenant.nomComplet} | Ville: ${apprenant.ville} | Progression: ${progression}%`
    );
  }
  return true;
}