import { FormControl } from '@angular/forms';
import { FormField } from '../../models/form-field';
import { ICreateComponentParams } from '../../services/form-generator.service';
import { InputFieldComponent } from './input-field.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { Injector } from '@angular/core';

interface dialogConfiguration {
  width?: string,
  height?: string,
  maxWidth?: string,
  maxHeight?: string,
  panelClass?: string,
  data?: any,
}

export class NumberField implements FormField {


  matDialog: MatDialog;

  constructor(private injector: Injector){
    this.matDialog = injector.get(MatDialog);
  }

  createFormField(createComponentData: ICreateComponentParams): FormControl {

    let createdComponent = createComponentData.target.createComponent(InputFieldComponent);
    createdComponent.instance.label = createComponentData.labelTittle;
    createdComponent.instance.isRequired = createComponentData.isRequired;
    createdComponent.instance.svgIcon = "heroicons_solid:calculator";
    createdComponent.instance.iconPosition = "start";
    createdComponent.instance.mask = "0*,0*";
    createdComponent.instance.actionOnClickInIcon = () => { this.openDialog(CalculatorComponent, {data: {formData: createdComponent.instance.inputValue.value}}) }
    createdComponent.instance.className = createComponentData.className;
    return createdComponent.instance.inputValue;
  }

  openDialog(component: ComponentType<any>, dialogConfiguration: dialogConfiguration) {
    return this.matDialog.open(component, dialogConfiguration);
  }
}