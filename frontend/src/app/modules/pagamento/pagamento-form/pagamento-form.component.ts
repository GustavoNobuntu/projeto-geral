import { AfterViewInit, Component, Injector, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core"; 
import { Pagamento } from "app/modules/pagamento/shared/pagamento.model"; 
import { PagamentoService } from "../shared/pagamento.service"; 
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceFormComponent } from "app/shared/components/form/form.component";  
import { FormGeneratorService } from "app/shared/services/form-generator.service";  
import { GeneratedFormFactoryService } from "app/shared/services/generated-form-factory.service";  
import { environment } from 'environments/environment';; 
import { Subject, takeUntil } from "rxjs"; 

@Component({
  selector: 'app-details-pagamento',
  templateUrl: './pagamento-form.component.html',
  styleUrls: ['./pagamento-form.component.scss']
})
export class PagamentoFormComponent extends BaseResourceFormComponent<Pagamento> implements AfterViewInit, OnDestroy { 


  JSONPath : string = environment.pagamentoJSONPath; 

  @ViewChild('placeToRender', {read: ViewContainerRef}) target!: ViewContainerRef; 
  /** 
   * Subject responsável por remover os observadores que estão rodando na pagina no momento do componente ser deletado. 
   */ 
//  private ngUnsubscribe = new Subject(); 

  constructor(
    protected pagamentoService: PagamentoService,//Linha alterável com base na classe 
    protected injector: Injector, 
    private generatedFormFactoryService: GeneratedFormFactoryService, 
    private formGeneratorService: FormGeneratorService 
  ) { 
    super(injector, new Pagamento(), pagamentoService, Pagamento.fromJson);//Linha alterável com base na classe 
    this.buildResourceForm(); 
  } 

  ngAfterViewInit(): void { 
    this.formGeneratorService.getJSONFromDicionario(this.JSONPath).pipe(takeUntil(this.ngUnsubscribe)).subscribe((JSONDictionary: any) => {

      // this.generatedFormFactoryService.getDataToCreateFrom(JSONDictionary, this.target, ()=>{this.getDataFromAPI()}, this.resourceForm, ()=>{this.submitForm()}, ()=>{this.deleteResource()}, this.currentAction)
      this.generatedFormFactoryService.createForm({target: this.target, getDataFromAPIFunction: ()=>{this.loadResource()}, submitFormFunction: ()=>{this.submitForm()}, deleteFormFunction: ()=>{this.deleteResource()}, currentFormAction: this.currentAction, dataToCreatePage: JSONDictionary, formOption: JSONDictionary.config.isFormStepper ? "stepperForm" : null, resourceForm: this.resourceForm, secondaryFormClassName: null })
    }); 
  } 

  getDataFromAPI() { 
    super.ngOnInit(); 
  } 

  protected buildResourceForm(): void { 
    this.resourceForm = this.formBuilder.group({ 
      id: [null], 
    }); 
  } 

//  ngOnDestroy(): void { 
//    this.ngUnsubscribe.next(null); 
//    this.ngUnsubscribe.complete(); 
//  } 
}
