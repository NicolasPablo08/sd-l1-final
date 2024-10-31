import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import * as includes from "lodash"
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  async getAll(): Promise<Peli[]> {
    const datos = await jsonfile.readFile("./pelis.json")
      this.data = datos
      return this.data;
  }
  
  add(peli:Peli):Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente){
        return false
      }else{
        this.data.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
        return promesaDos.then(()=>{
          return true
        })
      }
    });
    return promesaUno
  }
  getById(id:number):Promise<Peli>{
    const resultado = this.getAll().then((peli)=> {
      return peli.find((p)=> {
        return p.id == id;
      })
    })
    return resultado
  }
  async search(options):Promise<Peli[]>{
    const lista = await this.getAll()
    const listaFiltrada = lista.filter((p)=>{
      let esteVa = false;
      if(options.tag){
        return p.tags.includes(options.tag);
        esteVa = true;
      }
      if(options.title){
        return p.title.includes(options.title);
        esteVa = true;
      }
      return esteVa
    });
    return listaFiltrada

  }
}
export { PelisCollection, Peli };

const pablo = new PelisCollection()
pablo.getAll().then((data)=>{
  console.log(data)
});
pablo.getById(2).then((resultado)=>{
  console.log(resultado)
})
const la = {
  id: 5,
  title: "holita",
  tags: ["saludos"]
}
pablo.add(la).then((resultado)=> {
  console.log(resultado)
})