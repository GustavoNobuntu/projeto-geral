import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core'; 
import { ListFactoryService } from 'app/shared/services/list-factory.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list-tipo-pagamento',
  templateUrl: './list-tipo-pagamento.component.html',
  styleUrls: ['./list-tipo-pagamento.component.scss']
})
export class ListTipoPagamentoComponent implements AfterViewInit {

  JSONURL: string = environment.tipoPagamentoJSONPath;// Campo que é alterável, o nome do campo "variations"+"JSONPATH". 
  @ViewChild('placeToRender', { read: ViewContainerRef }) target!: ViewContainerRef; 

  constructor( 
    public listFactory: ListFactoryService //Adicionado!
  ) { } 

  ngAfterViewInit(): void { 
    this.listFactory.createList(this.target, this.JSONURL);//Adicionado!
  }  
}
