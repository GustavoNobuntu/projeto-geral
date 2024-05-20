import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core'; 
import { ListFactoryService } from 'app/shared/services/list-factory.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list-pedido',
  templateUrl: './list-pedido.component.html',
  styleUrls: ['./list-pedido.component.scss']
})
export class ListPedidoComponent implements AfterViewInit {

  JSONURL: string = environment.pedidoJSONPath;// Campo que é alterável, o nome do campo "variations"+"JSONPATH". 
  @ViewChild('placeToRender', { read: ViewContainerRef }) target!: ViewContainerRef; 

  constructor( 
    public listFactory: ListFactoryService //Adicionado!
  ) { } 

  ngAfterViewInit(): void { 
    this.listFactory.createList(this.target, this.JSONURL);//Adicionado!
  }  
}
