import * as jsonfile from "jsonfile";
import "./pelis.json"

type SearchOptions = {
  title?: string;
  tag?: string;
};

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  async getAll(): Promise<Peli[]> {
    const datos = await jsonfile.readFile("./pelis.json");
    this.data = datos;
    return this.data;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      this.data.push(peli);
      await jsonfile.writeFile("./pelis.json", this.data);
      return true;
    }
  }
  async getById(id: number): Promise<Peli> {
    const resultado = await this.getAll();
    return resultado.find((p) => p.id == id);
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((p) => {
      if (options.tag && options.title){
        const coincideTitle = p.title.includes(options.title); 
        const coincideTag = p.tags.includes(options.tag);
        return coincideTitle && coincideTag;
      }else if (options.tag) {
        return p.tags.includes(options.tag);
      } else if (options.title) {
        return p.title.includes(options.title);
      }
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };

// const pablo = new PelisCollection();
// pablo.getAll().then((data) => {
//   console.log(data);
// });
// pablo.getById(2).then((resultado) => {
//   console.log(resultado);
// });
// const la = {
//   id: 5,
//   title: "holita",
//   tags: ["saludos"],
// };
// pablo.add(la).then((resultado) => {
//   console.log(resultado);
// });
