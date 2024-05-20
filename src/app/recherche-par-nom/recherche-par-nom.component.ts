import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../Models/produit.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent implements OnInit {
  produits!: Produit[];
  nomProduit!: string;
  allProduits!: Produit[];
  searchTerm!: string;
  // ngOnInit(): void {
  //   this.produitService.listeProduit().subscribe(prods => {
  //     console.log(prods);
  //     this.allProduits = prods;
  //   });
  // }
  ngOnInit(): void {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }
  constructor(private produitService: ProduitService) { }
  rechercherProds() {
    this.produitService.rechercherParNom(this.nomProduit).
      subscribe(prods => {
        this.produits = prods;
        console.log(prods)
      });
  }
  onKeyUp(filterText: string) {
    this.produits = this.allProduits.filter(item =>
      item.nomProduit?.toLowerCase().includes(filterText));
  }
}
