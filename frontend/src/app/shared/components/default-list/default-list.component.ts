import { AfterViewInit, Component, EventEmitter, Inject, Injector, Input, OnDestroy, Optional, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { SelectableCardComponent } from '../selectable-card/selectable-card.component';
import { HttpClient } from '@angular/common/http';
import { DefaultCardComponent } from '../default-card/default-card.component';
import { TranslocoService } from '@ngneat/transloco';
import { ConfirmationDialogComponent, IConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { DinamicBaseResourceFormComponent, IDinamicBaseResourceFormComponent } from '../dinamic-base-resource-form/dinamic-base-resource-form.component';
import { environment } from 'environments/environment';
import { ISearchableField } from '../search-input-field/search-input-field.component';

export interface IDefaultListComponentDialogConfig {
  /**
   * Campo com os dados dos itens que serÃo apresenados na lista.
   * @example ['nome':'Maria', 'idade':'44'].
   */
  itemsDisplayed: any[],
  columnsQuantity: number,
  displayedfieldsName: string[],
  fieldsType: string[],
  objectDisplayedValue: string[]
  userConfig: any,
  selectedItemsLimit: number,
  apiUrl: string,
  searchableFields: ISearchableField[] | null,
  isSelectable: boolean,
  className: string,
  isAbleToCreate: boolean,
  isAbleToEdit: boolean,
  isAbleToDelete: boolean,
  dataToCreatePage: object,
  useFormOnDialog: boolean,
  isEnabledToGetDataFromAPI: boolean
}

@Component({
  selector: 'default-list',
  templateUrl: './default-list.component.html',
  styleUrls: ['./default-list.component.scss']
})
export class DefaultListComponent implements AfterViewInit, OnDestroy {
  /**
   * Campo com os dados dos itens que serÃo apresenados na lista.
   * @example ['nome':'Maria', 'idade':'44'].
   */
  @Input() itemsDisplayed: any[] = [];
  /**
   * Quantidade de colunas que tenha cada Card da lista.
   * @example "3"
   * Por padrão quando se está em dispositivos móveis a quantidade de colunas será 1.
   */
  @Input() columnsQuantity: number = 1;
  /**
   * Nomes dos campos que serão apresentados.
   * @example ['nome', 'idade'].
   */
  @Input() displayedfieldsName: string[] | null;
  /**
   * Tipos das variáveis da classe.
   * @example ['string', 'number'].
   */
  @Input() fieldsType: string[];

  /**
   * Caso o conter um campo do tipo objeto, será o nome do campo que está dentro do que será exibido. 
   * [Exemplo]: O campo tem um objeto, esse objeto tem "id", "name" e "age". O campo apresentado poderá ser o "name", assim aparecerá o valor do campo "name" no componente.
   * @example ['', '', 'id']
   */
  @Input() objectDisplayedValue: string[]

  @Input() userConfig: any;
  /**
   * Essa lista será uma lista que tu seleciona os itens?
   * @example true;
   */
  @Input() isSelectable: boolean = true;
  /**
   * Valor máximo de itens que podem ser selecionados.
   * @example 2.\
   * Exemplo permitir selecionar tudo: null.
   */
  @Input() selectedItemsLimit: number | null = null;
  /**
   * Campo que saída para os valores que foram selecionados.
   */
  @Output() eventSelectedValues = new EventEmitter<any[]>();
  /**
   * Link no qual é capaz de obter as instâncias dessa classe no banco de dados.\
   * @example "api/carros"
   */
  @Input() apiUrl!: string;
  /**
   * Campos pelo qual será realizada a busca no campo de buscas.\
   * @example ['name','phone'].
   */
  @Input() searchableFields: ISearchableField[] | null = null;
  /**
  * Número máximo de itens que serão renderizados na lista.\
  * @example 3
  */
  @Input() maxDisplayedItems: number = 25;
  /**
   * Nome da classe na qual o formulário pertence
   */
  @Input() className!: string;
  /**
   * Indica se a lista terá botão que direcionará para criação de novos itens.
   * @example "true" ou "false"
   */
  @Input() isAbleToCreate: boolean = true;
  /**
   * Indica que cada card da lista terá um botão que direcionará para editar cada item.
   * @example "true" ou "false"
   */
  @Input() isAbleToEdit: boolean = true;
  /**
   * Indica que cada item da lista poderá ser removido.
   * @example "true" ou "false"
   */
  @Input() isAbleToDelete: boolean = true;
  /**
   * Subject responsável por remover os observadores que estão rodando na pagina no momento do componente ser deletado.
   */
  private ngUnsubscribe = new Subject();

  /**
   * Itens da lista selecionados
   * @example [{'id':'1', 'nome':'aba'}, {'id':'2', 'nome':'Carlos'}]
   */
  selectedItems: any[] = [];
  /**
   * Lista com os componentes que estão sendo renderizados na lista.
   */
  private componentsCreatedList: any[] = [];
  /**
   * Estado do checkBox que seleciona todos os itens da lista.
   */
  selectAllCheckBox: boolean = false;
  /**
   * Estado que informa se o componente atual foi aberto por meio de um Dialog.
   * @example "true" ou "false"
   */
  isOpenedOnDialog: boolean = false;
  /**
   * Dados que orienta na criação das paginas.
   */
  @Input() dataToCreatePage: object;
  /**
   * Rota que levará para pagina da classe
   */
  @Input() route: string;
  /**
   * Define se a lista irá obter os dados da API para apresentar para o usuário.
   */
  @Input() isEnabledToGetDataFromAPI: boolean = true;
  /**
   * Define se o menu é fixado na tela
   */
  @Input() menuIsFixedOnScreen: boolean = true;
  /**
   * Define se o formulários que serão abertos a partir dessa lista serão abertos por dialog ou indo na página
   */
  @Input() useFormOnDialog: boolean = false;

  isLoading: boolean = true;

  @ViewChild('placeToRender', { read: ViewContainerRef }) target!: ViewContainerRef;

  protected router: Router;
  private http: HttpClient;
  private translocoService: TranslocoService;
  private matDialog: MatDialog;

  constructor(
    protected injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogInjectorData: IDefaultListComponentDialogConfig,
    @Optional() private matDialogComponentRef: MatDialogRef<DefaultListComponent>,

  ) {

    this.router = this.injector.get(Router);
    this.http = this.injector.get(HttpClient);
    this.translocoService = this.injector.get(TranslocoService);
    this.matDialog = this.injector.get(MatDialog);

    if (matDialogComponentRef != null) {
      this.isOpenedOnDialog = true;
    }

    if (dialogInjectorData != null) {

      this.itemsDisplayed = dialogInjectorData.itemsDisplayed;
      this.columnsQuantity = dialogInjectorData.columnsQuantity;
      this.displayedfieldsName = dialogInjectorData.displayedfieldsName;
      this.fieldsType = dialogInjectorData.fieldsType;
      this.objectDisplayedValue = dialogInjectorData.objectDisplayedValue;
      this.userConfig = dialogInjectorData.userConfig;
      this.searchableFields = dialogInjectorData.searchableFields;
      if (dialogInjectorData.selectedItemsLimit >= 0) {
        this.selectedItemsLimit = dialogInjectorData.selectedItemsLimit;
      }
      this.apiUrl = dialogInjectorData.apiUrl;
      this.isSelectable = dialogInjectorData.isSelectable;
      this.className = dialogInjectorData.className;
      this.isAbleToCreate = dialogInjectorData.isAbleToCreate;
      this.isAbleToEdit = dialogInjectorData.isAbleToEdit;
      this.dataToCreatePage = dialogInjectorData.dataToCreatePage;
      this.useFormOnDialog = dialogInjectorData.useFormOnDialog;
      this.isEnabledToGetDataFromAPI = dialogInjectorData.isEnabledToGetDataFromAPI;
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isEnabledToGetDataFromAPI == true) {
        this.getDataFromAPI(this.apiUrl);
      } else {
        this.getData(this.itemsDisplayed);
      }
    }, 0);
  }

  /**
   * Realiza a requisição na API para obter os dados e popular a lista.
   * @param apiURL Campos pelo qual será realizada a busca no campo de buscas. @example "api/carros"
   */
  getDataFromAPI(apiURL: string) {

    this.requestAllValuesFromAPI(apiURL).pipe(
      take(1),
      //Enquanto o observable está mandando os dados, fará oque tem na função
      tap(() => {
        this.isLoading = true;
      }),
      //Quando o observable completa ou encontra um erro
      finalize(() => {
        this.isLoading = false;
      }),
    ).subscribe({
      next: (itemsDisplayed) => {
        this.itemsDisplayed = itemsDisplayed;

        if (itemsDisplayed.length == 0) return;
        // console.log("Itens obtidos na requisição: ", itemsDisplayed);

        if (this.maxDisplayedItems > this.itemsDisplayed.length) this.maxDisplayedItems = this.itemsDisplayed.length;

        const itemsToDisplay = this.itemsDisplayed.slice(0, this.maxDisplayedItems);

        this.createItemsOnList(itemsToDisplay);
      },
      error(error) {
        //TODO permissio error
      }
    });
  }

  getData(itemsDisplayed: Object[]) {
    if (itemsDisplayed.length == 0) return;

    this.isLoading = false;

    if (this.maxDisplayedItems > itemsDisplayed.length) this.maxDisplayedItems = itemsDisplayed.length;

    const itemsToDisplay = itemsDisplayed.slice(0, this.maxDisplayedItems);

    this.createItemsOnList(itemsToDisplay);
  }

  /**
   * Função que irá instanciar os components Card na tela, com os dados dos itens.
   * @param itemsDisplayed Array com os itens que serão apresentados. @example [{"name":"Marie", "age":22}, {"name":"Josef", "age":32}]
   */
  createItemsOnList(itemsDisplayed: any[]) {
    this.componentsCreatedList = [];
    this.removeAllComponentsOnView();

    for (let index = 0; index < itemsDisplayed.length; index++) {

      let componentCreated;
      if (this.isSelectable == true) {
        componentCreated = this.target.createComponent(SelectableCardComponent).instance;
      } else {
        componentCreated = this.target.createComponent(DefaultCardComponent).instance;
      }

      this.componentsCreatedList.push(componentCreated);

      componentCreated.columnsQuantity = this.columnsQuantity;
      componentCreated.userConfig = this.userConfig;
      componentCreated.itemDisplayed = itemsDisplayed[index];

      componentCreated.displayedfieldsName = this.displayedfieldsName;

      componentCreated.fieldsType = this.fieldsType;
      componentCreated.objectDisplayedValue = this.objectDisplayedValue;

      componentCreated.className = this.className;

      if (this.isSelectable == true) {
        this.selectableFieldController(componentCreated);
        componentCreated.isEditable = this.isAbleToEdit;
        componentCreated.eventClickToEdit.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => { this.editItem(data) });
      } else {
        componentCreated.eventClick.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => { this.editItem(data) });
      }
    }

  }

  /**
   * Encaminha para pagina de edição.
   * @param item Dados do item que será alterado. @example [{"name":"Marie", "age":22}.
   */
  editItem(item: Object) {
    // console.log("Objeto que será alterado: ",item)
    if (this.useFormOnDialog == true) {
      this.openFormOnDialog("edit", item["id"]);
    } else {
      this.goToEditPage(item["id"]);
    }
  }

  /**
   * Redirecina para pagina de alteração do item
   * @param itemId ID do item que será alterado. 
   * @returns 
   */
  goToEditPage(itemId: string) {
    if (this.route == undefined || this.route == null) {
      console.warn("O valor de 'route' não foi passado corretamente");
      return;
    }
    this.router.navigate([this.route + "/" + itemId + "/edit"]);
  }

  /**
   * Abre o formulário em popUp/dialog tanto para edição ou criação.
   * @param action Qual ação será feita, sendo criação "new" ou edição "edit"
   * @param _itemId Id do item que será editado. Se for criado então pode ser "null" o valor preenchido no campo
   */
  openFormOnDialog(action: string, _itemId: string | null) {
    if (action !== "edit" && action !== "new") return;
    if (this.useFormOnDialog == false) return;

    // console.log("Dados para criação do form através da lista: ", this.dataToCreatePage)

    const config: IDinamicBaseResourceFormComponent = {
      dataToCreatePage: this.dataToCreatePage,
      className: this.className,
      currentAction: action,
      itemId: action === "edit" && _itemId ? _itemId : null
    }

    const dialogRef = this.matDialog.open(DinamicBaseResourceFormComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: config
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(item => {
      if (item == null) return;

      if ('action' in item) {
        return;
      }

    });
  }

  /**
   * Encaminha para pagina de criação
   */
  createItem() {
    if (this.isAbleToCreate == false) return;

    if (this.useFormOnDialog == true) {
      this.openFormOnDialog("new", null);
    } else {
      this.gotToCreationPage();
    }
  }

  /**
   * Redirecina para pagina de criação do item 
   */
  gotToCreationPage() {
    if (this.route == undefined || this.route == null) {
      console.warn("O valor de 'route' não foi passado corretamente");
      return;
    }

    this.router.navigate([this.route + "/new"]);
  }

  selectableFieldController(componentCreated: SelectableCardComponent) {
    if (this.selectedItemsLimit == null) {
      this.selectedItemsLimit = this.itemsDisplayed.length;
    }

    componentCreated.eventOnSelect.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.checkItem(this.selectedItemsLimit, componentCreated, data);
    });
  }

  checkItem(selectedItemsLimit: number, componentCreated: SelectableCardComponent, data) {
    const dataIsSelected: boolean = this.selectedItems.some(item => item === data);

    if (this.selectedItems.length == this.itemsDisplayed.length - 1) {
      this.selectAllCheckBox = true;
    }

    //Se o componente não foi selencionado
    if (dataIsSelected == false) {

      if (selectedItemsLimit != null) {
        //Se o limite de itens selecionados não foi ultrapassado
        if (this.selectedItems.length < selectedItemsLimit) {
          this.selectedItems.push(data);//Seleciona o item
          componentCreated.isSelected = true;
        }
      } else {
        this.selectedItems.push(data);
        componentCreated.isSelected = true;
      }

    } else {
      if (this.selectAllCheckBox == true) {
        this.selectAllCheckBox = false;
      }
      this.selectedItems = this.selectedItems.filter(item => item !== data);
      componentCreated.isSelected = false;
    }
  }

  handlePageEvent($event) {

    let firstlItemToDisplayIndex: number = $event.pageIndex * $event.pageSize;//0
    let lastItemToDisplayIndex: number = firstlItemToDisplayIndex + $event.pageSize;//10 + 25 = 35

    if (lastItemToDisplayIndex > this.itemsDisplayed.length) lastItemToDisplayIndex = this.itemsDisplayed.length;

    const itemsToDisplay = this.itemsDisplayed.slice(firstlItemToDisplayIndex, lastItemToDisplayIndex);
    this.createItemsOnList(itemsToDisplay);

    //Regra para após de instanciar os cards pra nova pagina, verifique se os cards foram selecionados, para marcar eles
    if (this.isSelectable == true) {
      itemsToDisplay.forEach((item, index) => {
        const dataIsSelected: boolean = this.selectedItems.some(_item => _item === item);
        if (dataIsSelected == true) {
          this.componentsCreatedList[index].isSelected = true;
        }
      });
    }
  }

  removeAllComponentsOnView() {
    if (this.target == null) console.warn("target é null");
    this.target.clear();
  }

  getInstanceVariableValue(instance, variableName: string) {
    return instance[variableName]
  }


  onSelectedItemsCheckBoxChange(event) {
    this.selectAllCheckBox = event.checked;
    if (event.checked == true) {
      this.selectAllItems();
    } else {
      this.unSelectAllItems();
    }
  }

  selectAllItems() {
    this.selectedItems = this.itemsDisplayed;
    this.checkAllItems();
  }

  unSelectAllItems() {
    this.selectedItems = [];
    this.unCheckAllItems();
  }

  checkAllItems() {
    if (this.componentsCreatedList == null) return;

    this.componentsCreatedList.forEach(component => {
      component.isSelected = true;
    })
  }

  unCheckAllItems() {
    if (this.componentsCreatedList == null) return;

    this.componentsCreatedList.forEach(component => {
      component.isSelected = false;
    })
  }

  /**
   * Realiza uma requisição GET para API a partir do caminho passado.
   * @param apiUrl Caminho da API para realizar a requisição @example O trecho "api/carros" de "https://siteDoProgramador.com/api/carros"
   * @returns Retorna um observador que irá observar os dados que serão retornados da API.
   */
  requestAllValuesFromAPI(apiUrl: string): Observable<any> {
    return this.http.get(environment.backendUrl + '/' + apiUrl);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  /**
   * Função que removerá os itens selecionados na API e atualizará os itens da lista com os itens da API.
   */
  deleteSelectedItens(): any[] {

    if (this.selectedItems.length <= 0) {
      return;
    }

    let dialogMessage: string = this.translocoService.translate("componentsBase.confirmation-dialog.messageToConfirmDelete");

    //Irá abrir o dialog para perguntar para o usuário se ele tem certeza se quer remover os itens e depois dará continuidade com base na resposta selecionada pelo usuário.
    this.openConfirmationDialog(dialogMessage).afterClosed().pipe(take(1)).subscribe((result: boolean) => {
      if (result == true) {

        this.selectedItems.forEach((item) => {
          this.http.delete(environment.backendUrl + "/" + this.apiUrl + '/' + item.id).subscribe({
            error: (error) => alert(this.translocoService.translate("componentsBase.Alerts.deleteErrorMessage")),
          }).unsubscribe();
        });

        this.selectedItems = [];

        alert(this.translocoService.translate("componentsBase.Alerts.deleteSuccessMessage"));

        this.getDataFromAPI(this.apiUrl);
      }

    });

  }

  /**
   * Fechará e esse componte que foi como dialog.
   */
  return() {
    if (this.matDialogComponentRef == null) return;

    this.matDialogComponentRef.close(null);
  }

  /**
   * Fechará e esse componte e retornará os itens que foram selecionados para o componente pai que abriu esse componente como dialog.
   */
  returnWithSelectedItems() {
    if (this.matDialogComponentRef == null) return;

    this.matDialogComponentRef.close(this.selectedItems);
  }

  /**
   * Abrirá um dialog com o conponente de confirmação, que permite o usuário.
   * @param message Mensagem que será apresentada no componente de confirmação.
   * @returns Retorna uma referência do componente de confirmação que foi aberto na página atual.
   */
  openConfirmationDialog(message: string): MatDialogRef<ConfirmationDialogComponent> {
    const confirmationDialog: IConfirmationDialog = {
      message: message
    }
    // console.log(message);
    return this.matDialog.open(ConfirmationDialogComponent, { data: confirmationDialog });
  }
}
