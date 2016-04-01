"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Medida -constructor
exports.Medida = function Medida(valor,tipo) {

  this.valor = valor;
  this.xrgxp = XRegExp;
  // this.tipo = "";
  this.ca = XRegExp('(?<value> ^\\s*([-+]?\\d+(?:\\.\\d+)?(?:\\s*e\\s?[-+]?\\d+)?)\\s*?º?)\\s* # valor   \n\
                    (?<units>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?) |             # celsisu \n\
                    (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|         # fahrenheit \n\
                    (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))\\s*)                             # kelvin  \n\
                    ((?<to> (?:\\s*to)?\\s*)                                                   # to \n\
                    (?<units2>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|            # celsisu \n\
                    (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|         # fahrenheit \n\
                    (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))))?\\s*$                          # kelvin ', 'x');

  if (tipo != undefined) {
    this.tipo = tipo;
  }

}

Medida.prototype.tipoMedida = {
     k:'Kelvin', f:'Fahrenheit',c:'Celsius'
  };

Medida.prototype.match = function(evaluate) {
   return this.xrgxp.exec(evaluate, this.ca);
}


//Calculo de la conversion de temperaturas
Medida.prototype.calculate = function(original, convertir) {

  var tipoMedida = this.tipoMedida;
  var match = this.match(original);
  if (match) {
    var destino = convertir;
    var numero = match.value,
        tipo   = match.units.charAt(0).toLocaleLowerCase().trim();
    if(match.units2)
        var destino = match.units2.charAt(0).toLocaleLowerCase().trim();

    try {
      var source = eval( 'new ' + tipoMedida[tipo] + '(' + numero + ')') ;
      var target = eval( 'source.to' + tipoMedida[destino] + '()');
      return target.valor + "" + target.tipo;
    }
    catch(err) {

      return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '" \n';
    }
  }
  else
    return "Introduzca una temperatura valida: 330e-1 F to C";
}

exports.medida = new Medida;

})(this)
