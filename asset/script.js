document.addEventListener("DOMContentLoaded", () => {

	// Fonction pour randomiser un élément
	function getRandomItem(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	// Chargement du JSON
	fetch("asset/conseils.json")
		.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP error : ${res.status}`);
			}
			return res.json();
		})
		.then(data => {
			// ÉTAT ACTUEL
			// Pour l'instant en dur, mais plus tard automatique
			const currentState = "mid";

			// Récupération du tableau de phrases correspondant à l’état
			const phrases = data.bloc[currentState];

			// Sécurité : on vérifie que le tableau existe bien
			if (!Array.isArray(phrases)) {
				console.warn(`Aucune phrase pour l’état : ${currentState}`);
				return;
			}

			// Sélection d’une phrase aléatoire
			const randomPhrase = getRandomItem(phrases);

			// Injection de la phrase dans le HTML
			document.querySelectorAll(".AllTxt").forEach(txt => {
				txt.innerHTML = randomPhrase;
			});

		})
		.catch(err => {
			// Gestion des erreurs (JSON manquant, mal formé, etc.)
			console.error("Erreur lors du chargement du JSON :", err);
		});

});
