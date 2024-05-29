export interface IPageStructure {
  config: IPageStructureConfig;
  attributes: IPageStructureAttributes[];
  
}

export interface IPageStructureConfig {
  modified: Date;
  description: string;
  name: string;
  apiUrl: string;
  route: string;
  localStorage: boolean;
  filter: boolean;
  searchableFields: string[];
  addNew: boolean;
  edit: boolean;
  columnsQuantity: number;
  delete: boolean;
  isFormStepper: boolean;
  isLinearFormStepper: boolean;
}

export interface IPageStructureAttributes {
  name: string;
  type: string;
  className: string;
  many: boolean;
  apiUrl: string;
  fieldDisplayedInLabel: string;
  visibleCard: boolean;
  visibleGrid: boolean;
  visibleFilter: boolean;
  visibleList: boolean;
  forageinKey: string;
  lookup: boolean;
  viewDetails: boolean;
  searchable: string[];
  addNew: boolean;
  properties: IPageStructureAttributesProperties[];
  visibleForm: boolean;
}

export interface IPageStructureAttributesProperties {
  type: string;
  name: string;
  visibleCard: boolean;
  visibleGrid: boolean;
  visibleFilter: boolean;
  visibleList: boolean;
  visibleForm: boolean;
}

export class PageStructure implements IPageStructure {
  config: IPageStructureConfig;
  attributes: IPageStructureAttributes[];

  constructor(data: IPageStructure) {
    
  }
}