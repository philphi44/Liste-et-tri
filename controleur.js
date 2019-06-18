var controleur =(
    function(service)
    {
        var controleur={};
        controleur.initialiserFormulaire = function()
        {
            var savoirInutile = service.getSavoirDefaut();
            document.getElementById("libelleSavoir").value=savoirInutile.auteur;
            document.getElementById("auteur").value=savoirInutile.savoir;
            document.getElementById("date").valueAsDate=savoirInutile.dateDecouverte;
            document.getElementById("libelleSavoir").focus();
            controleur.afficherSavoirs();
        }

        controleur.effacerSavoirs = function()
        {
            var olSavoir = document.getElementById("olListeSavoir");
            olSavoir.innerHTML="";
        }

        controleur.afficherSavoirs = function()
        {
            controleur.effacerSavoirs();

            var olSavoir = document.getElementById("olListeSavoir");

            service.getSavoirsInutiles().forEach((value, index, array)=>
                {
                    var liSavoir = document.createElement("li");
                    var pSavoir = document.createElement("p");
                    var pInfos = document.createElement("p");
                    pSavoir.className = "savoir";
                    pInfos.className = "infos";
                    liSavoir.addEventListener("click", controleur.supprimer);

                    liSavoir.id=index;
                    pSavoir.innerText = value.savoir;
                    console.log(value);
                    pInfos.innerText = value.informations();

                    olSavoir.appendChild(liSavoir);
                    liSavoir.appendChild(pSavoir);
                    liSavoir.appendChild(pInfos);
                }
            )
        }

        controleur.ajouter = function() {
            var ajoutOk = service.ajouterSavoir(document.getElementById("libelleSavoir").value,
                document.getElementById("auteur").value,
                document.getElementById("date").valueAsDate);

            if (ajoutOk) {
                controleur.afficherSavoirs();
                controleur.initialiserFormulaire();
            }
            else {
                alert("Tous les champs sont obligatoires");
            }
        }

        controleur.supprimer = function(event)
        {
            var index = event.currentTarget.id;
            if(confirm(`Voulez-vous supprimer le savoir "${service.getSavoirsInutiles()[index].savoir}"?`))
            {
                service.supprimerSavoir(index);
                controleur.afficherSavoirs();
                controleur.initialiserFormulaire();
            }
        }

        controleur.trier = function(type)
        {
            service.trierSavoirs(type);
            controleur.afficherSavoirs();
        }

        return controleur;
    }
)(service);


//Initialisation des traitements
controleur.initialiserFormulaire();