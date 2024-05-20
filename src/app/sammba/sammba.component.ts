import { Component, OnInit } from '@angular/core';
import { Produit } from '../Models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../Models/categorie.model';


@Component({
  selector: 'app-sammba',
  templateUrl: './sammba.component.html',
  styleUrl: './sammba.component.css'
})
export class SammbaComponent implements OnInit {
  produits?: Produit[];
  categories! : Categorie[];
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.chargerProduits();
  }
  chargerProduits() {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }
  supprimerProduit(p: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      });
  }
}
