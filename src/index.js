import promptSync from "prompt-sync";
import {
  ajouterApprenant,
  rechercherApprenant,
  calculerProgression,
  enregistrerResultat,
  afficherApprenants,
} from "./function.js";

const prompt = promptSync();
let applicationActive = true;

while (applicationActive) {
  console.log("\n=== GESTION DES APPRENANTS ===");
  console.log("1. Ajouter un apprenant");
  console.log("2. Rechercher un apprenant");
  console.log("3. Calculer la progression");
  console.log("4. Enregistrer un résultat");
  console.log("5. Afficher Les Apprenants");
  console.log("0. Quitter");
  console.log("==============================");
  let choix = prompt("Veuillez choisir une option (0-6) : ");

  switch (choix) {
    case "1":
      console.log("\n--- Ajout d'un apprenant ---");
      let nomSaisi = prompt("Entrez le nom complet : ");
      let villeSaisie = prompt("Entrez la ville : ");

      ajouterApprenant(nomSaisi, villeSaisie);
      break;
    case "2":
      console.log("\n--- Recherche ---");

      let saisie = prompt("Entrez l'ID ou le nom de l'apprenant : ");
      let resultatsRecherche;

      if (isNaN(saisie)) {
        resultatsRecherche = rechercherApprenant(saisie);
      } else {
        resultatsRecherche = rechercherApprenant(Number(saisie));
      }

      if (resultatsRecherche !== null) {
        console.log(resultatsRecherche);
      }

      break;
    case "3":
      console.log("\n--- Calcul de Progression ---");

      let idProgression = Number(prompt("Entrez l'ID de l'apprenant : "));
      let progression = calculerProgression(idProgression);
      console.log(`Progress Actuel: ${progression}%`);

      break;
    case "4":
      console.log("\n--- Enregistrer un résultat ---");
      let idResultat = Number(prompt("Saisi ID: "));
      let jour = Number(prompt("Saisi Le Jour: "));
      let exercicesTermines = Number(
        prompt("Saisi Le nombres des exersercices terminer "),
      );
      let totalExercices = Number(
        prompt("Saisi Le nombre total des exercices donnée "),
      );
      let challengeTermine = Number(
        prompt("Challenge terminer ? saisi 1 (yes), ou 0 (no): "),
      );

      enregistrerResultat(
        idResultat,
        jour,
        exercicesTermines,
        totalExercices,
        challengeTermine,
      );
      break;
    case "5":
      console.log("\n--- Afficher Les Apprenants ---");
      afficherApprenants()

      break;
    case "6":
      console.log("\n--- Filtrer Les Etudiants ---");
      let nivoo = Number(prompt("Saisi Le Niveau Minimal: "));
      let resultatsFiltrer = filtrerParNiveau(nivoo);

      for (let item of resultatsFiltrer) {
        let score = calculerProgression(item.id);
        console.log(
          `ID: ${item.id} | Nom: ${item.nomComplet} | Progression: ${score}%`,
        );
      }

      break;
    case "7":
      console.log("\n--- Triée Les Etudiants Par Progression ---");
      let triée = trierParProgression();
      for (let i = 0; i < triée.length; i++) {
        let score = calculerProgression(triée[i].id);
        console.log(`${i + 1}. ${triée[i].nomComplet} | Progress: ${score}`);
      }

      break;
    case "8":
      console.log("\n--- Triée Les Etudiants Par Alphabetic Ordre ---");
      let tri = trierParOrdreAlphabetique();
      for (let i = 0; i < tri.length; i++) {
        let scor = calculerProgression(tri[i].id);
        console.log(`${i + 1}. ${tri[i].nomComplet} | ${scor}`);
      }

      break;
    case "0":
      console.log("Fermeture de l'application. Au revoir !");
      applicationActive = false;
      break;
    default:
      console.log("Erreur : Option invalide.");
  }
 }