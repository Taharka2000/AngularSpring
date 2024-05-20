import { Component, OnInit } from '@angular/core';
import { Produit } from '../Models/produit.model';
import { Categorie } from '../Models/categorie.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styleUrl: './recherche-par-categorie.component.css'
})
export class RechercheParCategorieComponent implements OnInit {
  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];
  constructor(private produitService:ProduitService){}
  ngOnInit(): void {
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
    console.log(cats);
    });
  }
  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).
    subscribe(prods =>{this.produits=prods});
    }
}
