import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BirthdaysWebPartStrings';
import Birthdays from './components/Birthdays';
import { IBirthdaysProps } from './components/IBirthdaysProps';

export interface IBirthdaysWebPartProps {
  description: string;
}

export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBirthdaysProps > = React.createElement(
      Birthdays,
      {
        description: this.properties.description,
        width: this.domElement.clientWidth
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
