import { AfterViewInit, Component, Injector, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core"; 
import { CartaoConsumo } from "app/modules/cartao-consumo/shared/cartao-consumo.model"; 
import { CartaoConsumoService } from "../shared/cartao-consumo.service"; 
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceFormComponent } from "app/shared/components/form/form.component";  
import { FormGeneratorService } from "app/shared/services/form-generator.service";  
import { GeneratedFormFactoryService } from "app/shared/services/generated-form-factory.service";  
import { environment } from 'environments/environment';; 
import { Subject, takeUntil } from "rxjs"; 
import { HttpClient } from "@angular/common/http";
import { IPageStructure } from "app/shared/models/pageStructure";

@Component({
  selector: 'app-details-cartao-consumo',
  templateUrl: './cartao-consumo-form.component.html',
  styleUrls: ['./cartao-consumo-form.component.scss']
})
export class CartaoConsumoFormComponent extends BaseResourceFormComponent<CartaoConsumo> implements AfterViewInit, OnDestroy { 

  //Local onde se encontra o arquivo JSON que orienta a criação da tela
  JSONPath : string = environment.cartaoConsumoJSONPath; 

  //Referência onde será instanciado os componentes dinâmicamente na tela
  @ViewChild('placeToRender', {read: ViewContainerRef}) target!: ViewContainerRef; 

  constructor(
    protected cartaoConsumoService: CartaoConsumoService,//Linha alterável com base na classe 
    protected injector: Injector, 
    private generatedFormFactoryService: GeneratedFormFactoryService, 
    private formGeneratorService: FormGeneratorService,
    protected httpClient: HttpClient
  ) { 
    super(injector, new CartaoConsumo(), cartaoConsumoService, CartaoConsumo.fromJson);//Linha alterável com base na classe 
    this.buildResourceForm(); 
  } 

  ngAfterViewInit(): void { 
    this.formGeneratorService.getJSONFromDicionario(this.JSONPath).pipe(takeUntil(this.ngUnsubscribe)).subscribe((JSONDictionary: IPageStructure) => {

      this.generatedFormFactoryService.createForm({target: this.target, getDataFromAPIFunction: ()=>{this.loadResource()}, submitFormFunction: ()=>{this.submitForm()}, deleteFormFunction: ()=>{this.deleteResource()}, currentFormAction: this.currentAction, dataToCreatePage: JSONDictionary, formOption: JSONDictionary.config.isFormStepper ? "stepperForm" : null, resourceForm: this.resourceForm, secondaryFormClassName: null })
    }); 
  } 

  protected buildResourceForm(): void { 
    this.resourceForm = this.formBuilder.group({ 
      id: [null], 
    }); 
  } 

}
