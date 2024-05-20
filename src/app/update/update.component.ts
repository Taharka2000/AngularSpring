import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../Models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../Models/categorie.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  currentProduit = new Produit();
  categories!: Categorie[];
  updatedCatId?: number;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private produitService: ProduitService) { }
  ngOnInit() {
    this.produitService.listeCategories().subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);});

      this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
        subscribe( prod =>{ this.currentProduit = prod;
        this.updatedCatId =this.currentProduit.categorie.idCat;
        } ) ;
    
      
  }
  updateProduit() { //console.log(this.currentProduit);
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {this.router.navigate(['produits']);}
    );
  }
}
