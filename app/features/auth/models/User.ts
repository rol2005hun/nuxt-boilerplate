import { Model } from 'pinia-orm';

export class User extends Model {
  static override entity = 'users';

  static override fields() {
    return {
      id: this.number(0),
      name: this.string(''),
      email: this.string(''),
      isAdmin: this.boolean(false),
      avatarUrl: this.string('')
    };
  }

  id!: number;
  name!: string;
  email!: string;
  isAdmin!: boolean;
  avatarUrl!: string;
}
