import { Component, OnInit } from '@angular/core';
import { Categorie } from '../Models/categorie.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styleUrl: './liste-categories.component.css'
})
export class ListeCategoriesComponent implements OnInit {
  categories!: Categorie[];
  categorie!: Categorie;
  ajout:boolean=true;
  updatedCat: Categorie = { "idCat": 0, "nomCat": "" };
  constructor(private produitService: ProduitService) { }
  ngOnInit(): void {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      })
  }
  categorieUpdated(cat: Categorie) {
    console.log("Cat updated event", cat);
    this.produitService.ajouterCategorie(cat).
      subscribe(() => this.chargerCategories());
  }
  chargerCategories() {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }
  updateCat(cat: Categorie) {
    this.updatedCat = cat;
    this.ajout=false; 
  }
}