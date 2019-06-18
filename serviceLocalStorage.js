var service = (
    function(bo)
    {
        var service={};
        var cleSavoirsInutiles="savoirsInutiles";
        var savoirsInutiles;

        (function()
        {
            savoirsInutiles = JSON.parse(localStorage.getItem(cleSavoirsInutiles))||[];
            savoirsInutiles.forEach(value => {Object.setPrototypeOf(value,bo.SavoirInutile.prototype);
                                              value.dateDecouverte=new Date(value.dateDecouverte)});
            savoirsInutiles.forEach(value => {console.log(value)});

        })();

        service.ajouterSavoir = function(savoir,auteur,dateDecouverte)
        {
            var savoirAAjouter = new bo.SavoirInutile(savoir, auteur, dateDecouverte);
            if(savoirAAjouter.toutEstSaisie()) {
                savoirsInutiles.push(savoirAAjouter);
                service.persister();
                return true;
            }
            return false;
        }

        service.supprimerSavoir = function(index)
        {
            savoirsInutiles.splice(index,1);
            service.persister();
        }

        service.trierSavoirs = function(type)
        {
            switch (type) {
                case 'a_az':
                    savoirsInutiles.sort((siA,siB)=>siA.auteur.localeCompare(siB.auteur));
                    break;
                case 'a_za':
                    savoirsInutiles.sort((siA,siB)=>siB.auteur.localeCompare(siA.auteur));
                    break;
                case 'd_ra':
                    savoirsInutiles.sort((siA,siB)=>siA.dateDecouverte-siB.dateDecouverte);
                    break;
                case 'd_ar':
                    savoirsInutiles.sort((siA,siB)=>siB.dateDecouverte-siA.dateDecouverte);
                    break;
                default:
                    break;
            };
        }

        service.getSavoirsInutiles = function()
        {
            return savoirsInutiles;
        }

        service.getSavoirDefaut = function()
        {
            return new bo.SavoirInutile("","",new Date());
        }

        service.persister = function()
        {
            localStorage.setItem(cleSavoirsInutiles,JSON.stringify(savoirsInutiles));
        }


        return service;
    }
)(bo);