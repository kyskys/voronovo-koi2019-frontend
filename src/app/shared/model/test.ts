import { TestItem } from './test-item';

export class Test {
  id: number;
  name: string;
  active: boolean;
  startedAt: Date;
  items: TestItem[] = [];
}
