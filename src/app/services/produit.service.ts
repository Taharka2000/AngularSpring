import { Injectable } from '@angular/core';
import { Produit } from '../Models/produit.model';
import { Categorie } from '../Models/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../config';
import { CategorieWrapper } from '../Models/categorieWrapped.model';
import { AuthService } from '../services/auth/auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiURLCat: string = 'http://localhost:8080/cat';

  // categories: Categorie[];

  constructor(private http: HttpClient, private authService: AuthService,) { }
  listeProduit(): Observable<Produit[]> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit[]>(`${apiURL}/all`);
  }
  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(`${this.apiURLCat}/all`);
  }
  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(apiURL, prod, httpOptions);
  }
  supprimerProduit(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(apiURL, prod, httpOptions);
  }
  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }
  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }
}