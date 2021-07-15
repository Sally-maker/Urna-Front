import { v4 } from 'uuid';

function generateID(): string {
  return v4();
}

export default generateID;
