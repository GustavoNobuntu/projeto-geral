import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core'; 
import { ListFactoryService } from 'app/shared/services/list-factory.service';//Alterado!
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss']
})
export class ListClienteComponent implements AfterViewInit  {

  JSONURL: string = environment.clienteJSONPath;// Campo que é alterável, o nome do campo "variations"+"JSONPATH". 

  @ViewChild('placeToRender', { read: ViewContainerRef }) target!: ViewContainerRef; 

  constructor( 
    public listFactory: ListFactoryService //Adicionado!
  ) { } 

  ngAfterViewInit(): void { 
    this.listFactory.createList(this.target, this.JSONURL);//Adicionado!
  } 
}
