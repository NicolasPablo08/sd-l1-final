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
  // async get(options?: Options): Promise<any> {
  //   if (options?.id) {
  //     const peli = await this.coll.getById(options.id);
  //     return peli || null; // Retornar null si no se encuentra la película
  //   } else if (options?.search) {
  //     return this.coll.search(options.search); // Retornar el resultado de la búsqueda
  //   }
  //   return this.coll.getAll(); // Retornar todas las películas
  // }

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
