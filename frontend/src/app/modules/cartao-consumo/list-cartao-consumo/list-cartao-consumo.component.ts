import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core'; 
import { ListFactoryService } from 'app/shared/services/list-factory.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list-cartao-consumo',
  templateUrl: './list-cartao-consumo.component.html',
  styleUrls: ['./list-cartao-consumo.component.scss']
})
export class ListCartaoConsumoComponent implements AfterViewInit {

  JSONURL: string = environment.cartaoConsumoJSONPath;// Campo que é alterável, o nome do campo "variations"+"JSONPATH". 

  @ViewChild('placeToRender', { read: ViewContainerRef }) target!: ViewContainerRef; 

  constructor( 
    public listFactory: ListFactoryService //Adicionado!
  ) { } 

  ngAfterViewInit(): void { 
    this.listFactory.createList(this.target, this.JSONURL);//Adicionado!
  }  
}
