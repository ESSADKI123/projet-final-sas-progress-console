import { apprenants } from "./data.js";

export function normaliserNom(nom) {
  return String(nom).trim().toLowerCase();
}

export function validerResultat(
  jour,
  exercicesTermines,
  totalExercices,
  challengeTermine,
) {
  if (jour < 1 || jour > 7) {
    console.log("Erreur: Le jour doit être entre 1 et 7.");
    return false;
  }
  if (exercicesTermines < 0 || totalExercices < 0) {
    console.log(
      "Erreur: Le nombre d'exercices terminés ne peut pas etre negative",
    );
    return false;
  }
  if (exercicesTermines > totalExercices) {
    console.log(
      "Erreur: Le nombre d'exercices terminés ne peut pas dépasser le total proposé.",
    );
    return false;
  }
  if (totalExercices > 20) {
    console.log("Erreur: Le nombre total d'exercices ne peut pas dépasser 20.");
    return false;
  }
  if (challengeTermine !== 1 && challengeTermine !== 0) {
    console.log("Erreur: must be eaither 1 or 0 ");
    return false;
  }
  return true;
}

export function ajouterApprenant(nomComplet, ville) {
  for (let item of apprenants) {
    if (normaliserNom(nomComplet) === normaliserNom(item.nomComplet)) {
      console.log("Apprenant is already existed");
      return false;
    }
  }
  let obj = {
    id: apprenants.length + 1,
    nomComplet: nomComplet,
    ville: ville,
    resultats: [],
  };
  apprenants.push(obj);
  console.log("Added successfully");
  return true;
}

export function rechercherApprenant(critere) {
  for (let item of apprenants) {
    if (typeof critere === "string") {
      if (normaliserNom(item.nomComplet).includes(normaliserNom(critere))) {
        return item;
      }
    } else {
      if (critere === item.id) {
        return item;
      }
    }
  }
  console.log("Apprenant non trouvé");
  return null;
}

export function calculerProgression(id) {
  let cible = rechercherApprenant(id);
  if (cible === null) {
    console.log("Apprenant n'exist pas exister");
    return 0;
  }
  if (cible.resultats.length === 0) {
    return 0;
  }
  let totalTerminer = 0;
  let totalProposer = 0;

  for (let item of cible.resultats) {
    totalProposer += item.totalExercices;
    totalTerminer += item.exercicesTermines;
  }

  return Math.round((totalTerminer / totalProposer) * 100);
}

export function enregistrerResultat(
  id,
  jour,
  exercicesTermines,
  totalExercices,
  challengeTermine,
) {
  let cible = rechercherApprenant(id);
  if (cible === null) {
    return false;
  }

  let estValider = validerResultat(
    jour,
    exercicesTermines,
    totalExercices,
    challengeTermine,
  );
  if (estValider === false) {
    return false;
  }

  let newResults = {
    jour: jour,
    exercicesTermines: exercicesTermines,
    totalExercices: totalExercices,
    challengeTermine: challengeTermine === 1,
  };

  cible.resultats.push(newResults);
  console.log("Résultat enregistré avec succès !");
  return true;
}

export function afficherApprenants() {
  console.log("\n=== LISTE DE TOUS LES APPRENANTS ===");

  for (let item of apprenants) {
    let progress = calculerProgression(item.id);
    console.log(
      `ID: ${item.id} | Name: ${item.nomComplet} | Ville: ${item.ville} | Progress: ${progress}%`,
    );
  }
  console.log("====================================");
  return true;
}
