import * as React from 'react';
import styles from './Birthdays.module.scss';
import { IBirthdaysProps } from './IBirthdaysProps';
import { IBirthdaysState } from './IBirthdaysState';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  IPersonaProps,
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import MockHttpClient from '../MockHttpClient';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { IUsers, IUser } from '../IUser';

export default class Birthdays extends React.Component<IBirthdaysProps, IBirthdaysState> {

  constructor(props: IBirthdaysProps) {
    super(props);
    this.state = {
      users: []
    };
  }

  public componentDidMount(): void {
    this._renderListAsync();
  }
  
  private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._setState(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      console.log('Sharepoint environment');
    }
  }

  private _getMockListData(): Promise<IUsers> {
    return MockHttpClient.get()
      .then((data: IUser[]) => {
        var listData: IUsers = { value: data };
        return listData;
      }) as Promise<IUsers>;
  }

  private _setState(users: IUser[]): void {

    // first N items
    this.setState(
      {
        users: users
      }
    );
  }

  public render(): React.ReactElement<IBirthdaysProps> {
    const BirthdayCards: JSX.Element[] = this.state.users.map((prop: IUser) =>
      <div className={styles.column}>
        <Persona
          {...{
            imageUrl: prop.imageUrl,
            imageInitials: 'AL',
            text: prop.title,
            secondaryText: prop.birthdayDate
          }}
          size={PersonaSize.size48}
          presence={PersonaPresence.offline}
          onRenderSecondaryText={this._onRenderSecondaryText}
        />
      </div>
    );

    return (
      <div className={styles.birthdays}>
        <div className={styles.container}>
          <div className={styles.row}>
            {BirthdayCards}
          </div>
        </div>
      </div>
    );
  }

  private _onRenderSecondaryText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={'BirthdayCake'} className={'ms-BirthdayCake'} />
        {props.secondaryText}
      </div>
    );
  };
}
