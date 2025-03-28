import { randomUUID } from 'node:crypto';

export class BaseEntity<Props> {
  private _id: string;

  protected props: Props;

  protected constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }
}
