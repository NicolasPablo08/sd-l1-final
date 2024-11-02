import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //console.log(!resultado)
  if (resultado._ == "add"){
    delete resultado._
    return resultado
  }else if (resultado._[0] == "get"){
    return {id:resultado._[1]}
  } else if (resultado._ == "search"){
      delete resultado._
      return {search:{title:resultado.title, tag: resultado.tag}}
  } else if(resultado._.length === 0){
    return{}
  }
  else {
    throw "comando ingresado incorrecto"
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliControll = new PelisController();
 (async()=> {
  if(params.id && params.title && params.tags){
    const resultado = await peliControll.add(params);
    console.log(resultado); 
  }else{
   const resultado = await peliControll.get(params);
   console.log(resultado);
  }
 })()
 //console.log(params);
}

main();
