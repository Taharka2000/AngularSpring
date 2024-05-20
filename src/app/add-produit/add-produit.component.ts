import { Component, OnInit } from '@angular/core';
import { Produit } from '../Models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { Categorie } from '../Models/categorie.model';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit {

  newProduit = new Produit();
  message: string | undefined;
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.produitService.listeCategories().
subscribe(cats => {console.log(cats);
this.categories=cats._embedded.categories;
}
);
  }

  addProduit() {
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit)
      .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['produits']);
      });
  }
}
