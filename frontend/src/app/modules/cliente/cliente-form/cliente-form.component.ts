import { AfterViewInit, Component, Injector, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core"; 
import { Cliente } from "app/modules/cliente/shared/cliente.model"; 
import { ClienteService } from "../shared/cliente.service"; 
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceFormComponent } from "app/shared/components/form/form.component";  
import { FormGeneratorService } from "app/shared/services/form-generator.service";  
import { GeneratedFormFactoryService } from "app/shared/services/generated-form-factory.service";  
import { environment } from 'environments/environment';; 
import { Subject, takeUntil } from "rxjs"; 

@Component({
  selector: 'app-details-cliente',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends BaseResourceFormComponent<Cliente> implements AfterViewInit, OnDestroy { 


  JSONPath : string = environment.clienteJSONPath; 

  @ViewChild('placeToRender', {read: ViewContainerRef}) target!: ViewContainerRef;

  constructor(
    protected clienteService: ClienteService,//Linha alterável com base na classe 
    protected injector: Injector, 
    private generatedFormFactoryService: GeneratedFormFactoryService, 
    private formGeneratorService: FormGeneratorService 
  ) { 
    super(injector, new Cliente(), clienteService, Cliente.fromJson);//Linha alterável com base na classe 
    this.buildResourceForm(); 
  } 

  ngAfterViewInit(): void { 
    this.formGeneratorService.getJSONFromDicionario(this.JSONPath).pipe(takeUntil(this.ngUnsubscribe)).subscribe((JSONDictionary: any) => {

      // this.generatedFormFactoryService.getDataToCreateFrom(JSONDictionary, this.target, ()=>{this.loadResource()}, this.resourceForm, ()=>{this.submitForm()}, ()=>{this.deleteResource()}, this.currentAction)
      this.generatedFormFactoryService.createForm({target: this.target, getDataFromAPIFunction: ()=>{this.loadResource()}, submitFormFunction: ()=>{this.submitForm()}, deleteFormFunction: ()=>{this.deleteResource()}, currentFormAction: this.currentAction, dataToCreatePage: JSONDictionary, formOption: JSONDictionary.config.isFormStepper ? "stepperForm" : null, resourceForm: this.resourceForm, secondaryFormClassName: null })
    
    }); 
  } 

  protected buildResourceForm(): void { 
    this.resourceForm = this.formBuilder.group({ 
      id: [null], 
    }); 
  } 

}
