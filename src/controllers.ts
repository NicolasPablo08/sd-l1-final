import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  coll: PelisCollection;
  constructor() {
    this.coll = new PelisCollection();
  }
  
  get(options?: Options): Promise<any> {
    if (options?.id) {
      return this.coll.getById(options.id);
    } else if (options?.search) {
      if (options.search.title && options.search.tag) {
        return this.coll.search({
          title: options.search.title,
          tag: options.search.tag,
        });
      } else if (options.search.title) {
        return this.coll.search({ title: options.search.title });
      } else if (options.search.tag) {
        return this.coll.search({ tag: options.search.tag });
      }
    }
    return this.coll.getAll();
  }
  add(peli: Peli) {
    return this.coll.add(peli);
  }
}

export { PelisController };
