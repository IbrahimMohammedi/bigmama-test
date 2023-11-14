# Processus de Recrutement BIGmama

Votre candidature a été retenue pour le processus de recrutement de
BIGmama qui est le suivant:

- Entretien téléphonique (optionnel):

  - L'objet de cet échange est de donner un aperçu des principales étapes du processus de recrutement.

- Test pratique:
  - Un dépôt privé sur GitLab est partagé avec vous pour héberger les résultats du test expliqué ci-dessous.
  - Développer la solution en utilisant Git et GitLab pour versionner le projet.
  - Envoyer un mail signifiant que vous avez terminé le développement.
  - Nous allons ensuite tester l'application.

## Entretien technique:

Un entretien est programmé dans les locaux de BIGmama. Le but de cet
entretien est de donner l'opportunité au candidat d'exposer le spèctre
de ses compétences. Ramener son ordinateur personnel est vivement encouragé.

## Entretien relationnel (optionnel):

Un second entretien sera planifié dans la mesure du possible. Suite à l'entretien,
vous receverez une réponse.

Il arrive qu'un candidat nous intéresse mais que nous ne puissions pas l'embaucher
immédiatement. Nous gardons soigneusement ce candidat dans une liste à part et nous
le contacterons dès que nous avons une opportunité de recruter.

## Foire aux Questions:

### Pour quel poste?

Le poste est celui de "Software Developer/Engineer" basé à Alger.

### Je ne suis pas en mesure de me présenter pour un entretien?

Répondre à la chaine mail pour informer de votre indisponibilité au
minimum 24h avant la date prévue de l'entretien, ou appeler la personne
qui vous a contaté par téléphone.

### Où en est ma candidature?

Nous envoyons des réponses à tous les candidats ayant répondu au test.
Cela peut parfois prendre du temps, mais nous tenons à donner un retour.
Nous allons vous contacter quelle que soit la décision prise.

### Je ne peux pas répondre au test présentement (cas de force majeure)

Envoyer un mail qui explique la situation.

### Quel langage dois-je utiliser?

Python et Typescript sont les languages les plus utilisés dans ce domaine, mais
vous pouvez utiliser le langage dans lequel vous êtes le plus à l'aise.

Traîter ce dépôt comme un réel projet. Une application qui servira
le modèle aux utilisateurs.

## Test

The test is creating a web application using any backend framework and any frontend framework that exposes an interface of [HuggingFace Summarization Inference API](https://huggingface.co/docs/api-inference/detailed_parameters#summarization-task) for non technical users to make predictions.

The usage scenario is that a user visiting the site can insert his text like chatgpt or quillbot and then choose some of the model parameters and ask for a prediction, once that is done they receive the result back in the UI.

The application should return meaningful feedback about expected errors or bad user inputs and should also be able to handle multiple concurrent users. The code must be versioned and pushed to a GitLab repository along with a deployment method and instructions.

Extra features like authentication or REST API or any enhancements thought of by the developer are appreciated.

Preferable framework to use:

- Backend: FastAPI
- Frontend: React/NextJS
- Database: MongoDB
- Deployment: Docker

You can find some useful resources at:

- [HuggingFace Inference API Quick Tour](https://huggingface.co/docs/api-inference/quicktour)
- [HuggingFace Summarization Inference API](https://huggingface.co/docs/api-inference/detailed_parameters#summarization-task)
