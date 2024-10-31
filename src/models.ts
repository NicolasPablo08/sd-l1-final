import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import * as includes from "lodash";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
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

  // async add(peli: Peli): Promise<boolean> {
  //   const promesaUno = this.getById(peli.id).then((peliExistente) => {
  //     if (peliExistente) {
  //       return false;
  //     } else {
  //       this.data.push(peli);
  //       const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
  //       return promesaDos.then(() => {
  //         return true;
  //       });
  //     }
  //   });
  //   return promesaUno;
  // }
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
      let esteVa = false;
      if (options.tag) {
        return p.tags.includes(options.tag);
        esteVa = true;
      }
      if (options.title) {
        return p.title.includes(options.title);
        esteVa = true;
      }
      return esteVa;
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
