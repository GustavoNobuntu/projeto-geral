import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core'; 
import { ListFactoryService } from 'app/shared/services/list-factory.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list-item-pedido',
  templateUrl: './list-item-pedido.component.html',
  styleUrls: ['./list-item-pedido.component.scss']
})
export class ListItemPedidoComponent implements AfterViewInit  {

  JSONURL: string = environment.itemPedidoJSONPath;// Campo que é alterável, o nome do campo "variations"+"JSONPATH". 
  @ViewChild('placeToRender', { read: ViewContainerRef }) target!: ViewContainerRef; 

  constructor( 
    public listFactory: ListFactoryService //Adicionado!
  ) { } 

  ngAfterViewInit(): void { 
    this.listFactory.createList(this.target, this.JSONURL);//Adicionado!
  }  
}
