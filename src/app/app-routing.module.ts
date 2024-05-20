import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SammbaComponent } from './sammba/sammba.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateComponent } from './update/update.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"produits",component:SammbaComponent},
  {path: "add-produit", component : AddProduitComponent},
  {path: "updateProduit/:id", component : UpdateComponent},
  {path: "rechercheParCategorie", component : RechercheParCategorieComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeCategories", component : ListeCategoriesComponent},
  {path: 'login', component: LoginComponent},
  { path: "", redirectTo: "produits", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
