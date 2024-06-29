export abstract class MockModel<T> {
    protected abstract entityStub: T;
  
    constructor(createEntityData: T) {
      this.constructorSpy(createEntityData);
    }
  
    constructorSpy(_createEntityData: T): void {}
  
    findOne(): Promise<T> {
      return Promise.resolve(this.entityStub);
    }

    create(data: T): Promise<T> {
      return Promise.resolve(data);
    }

    updateOne(): Promise<void> {
      return Promise.resolve();
    }
  }