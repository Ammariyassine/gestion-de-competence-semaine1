const fs = require('fs');
const readline = require('readline');

const FILE_PATH = 'ressources.json';

function lireRessources() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return [];
  }
}
function ecrireRessources(ressources) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(ressources, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier:', error);
  }
}
async function ajouterRessource(ressources, rl) {
  const id = ressources.length > 0 ? Math.max(...ressources.map(r => r.id)) + 1 : 1;
  
  const nom = await new Promise(resolve => rl.question('Nom de la ressource : ', resolve));
  
  let type;
  while (true) {
    console.log('Type de la ressource :');
    console.log('1. Humaine');
    console.log('2. Matérielle');
    const choixType = await new Promise(resolve => rl.question('Choisissez le type (1 ou 2) : ', resolve));
    if (choixType === '1') {
      type = 'humaine';
      break;
    } else if (choixType === '2') {
      type = 'materielle';
      break;
    }
    console.log('Choix invalide. Veuillez entrer 1 ou 2.');
  }
  
  const disponibilite = await new Promise(resolve => rl.question('La ressource est-elle disponible ? (oui/non) : ', resolve)) === 'oui';

  const nouvelleRessource = { id, type, nom, disponibilite };
  ressources.push(nouvelleRessource);
  ecrireRessources(ressources);
  console.log('Ressource ajoutée avec succès.');
}
function supprimerRessource(ressources, id) {
  const index = ressources.findIndex(r => r.id === id);
  if (index !== -1) {
    ressources.splice(index, 1);
    ecrireRessources(ressources);
    console.log('Ressource supprimée avec succès.');
  } else {
    console.log('Ressource non trouvée.');
  }
}
async function modifierRessource(ressources, id, rl) {
  const ressource = ressources.find(r => r.id === id);
  if (ressource) {
    ressource.nom = await new Promise(resolve => rl.question(`Nouveau nom (${ressource.nom}) : `, resolve)) || ressource.nom;
    
    let nouveauType;
    while (true) {
      console.log('Nouveau type de la ressource :');
      console.log('1. Humaine');
      console.log('2. Matérielle');
      console.log('3. Ne pas changer');
      const choixType = await new Promise(resolve => rl.question('Choisissez le type (1, 2 ou 3) : ', resolve));
      if (choixType === '1') {
        nouveauType = 'humaine';
        break;
      } else if (choixType === '2') {
        nouveauType = 'materielle';
        break;
      } else if (choixType === '3') {
        break;
      }
      console.log('Choix invalide. Veuillez entrer 1, 2 ou 3.');
    }
    if (nouveauType) ressource.type = nouveauType;

    const nouvelleDisponibilite = await new Promise(resolve => rl.question(`Nouvelle disponibilité (${ressource.disponibilite ? 'oui' : 'non'}) : `, resolve));
    if (nouvelleDisponibilite === 'oui' || nouvelleDisponibilite === 'non') {
      ressource.disponibilite = nouvelleDisponibilite === 'oui';
    }

    ecrireRessources(ressources);
    console.log('Ressource modifiée avec succès.');
  } else {
    console.log('Ressource non trouvée.');
  }
}
function rechercherRessource(ressources, nom) {
  const ressourcesTrouvees = ressources.filter(r => r.nom.toLowerCase().includes(nom.toLowerCase()));
  if (ressourcesTrouvees.length > 0) {
    console.log('Ressources trouvées :');
    ressourcesTrouvees.forEach(r => console.log(JSON.stringify(r, null, 2)));
  } else {
    console.log('Aucune ressource trouvée avec ce nom.');
  }
}
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  while (true) {
    console.log('\n1. Ajouter une ressource');
    console.log('2. Supprimer une ressource');
    console.log('3. Modifier une ressource');
    console.log('4. Afficher les ressources');
    console.log('5. Rechercher une ressource');
    console.log('6. Quitter');

    const choix = await new Promise(resolve => rl.question('Choisissez une option : ', resolve));

    let ressources = lireRessources();

    switch (choix) {
      case '1':
        await ajouterRessource(ressources, rl);
        break;
      case '2':
        const idSupprimer = parseInt(await new Promise(resolve => rl.question('ID de la ressource à supprimer : ', resolve)), 10);
        supprimerRessource(ressources, idSupprimer);
        break;
      case '3':
        const idModifier = parseInt(await new Promise(resolve => rl.question('ID de la ressource à modifier : ', resolve)), 10);
        await modifierRessource(ressources, idModifier, rl);
        break;
      case '4':
        console.log(JSON.stringify(ressources, null, 2));
        break;
      case '5':
        const nomRecherche = await new Promise(resolve => rl.question('Nom de la ressource à rechercher : ', resolve));
        rechercherRessource(ressources, nomRecherche);
        break;
      case '6':
        rl.close();
        return;
      default:
        console.log('Option invalide.');
    }
  }
}

main();
