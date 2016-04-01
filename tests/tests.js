var expect = chai.expect

describe('Medida', function() {
  describe('Constructor', function () {
    it ('debería aceptar dos parámetros (valor, tipo)',function() {
      var med = new Medida(24,'k');
      expect(med.valor+med.tipo).to.equal('24k');
    });
    it ('el tipo debería ser opcional',function() {
      var med = new Medida(24);
      expect(med.valor).to.equal(24);
    });
    it ('debería contener los tipos de medida a los que se pueden convertir',function() {
      var med = new Medida(24);
      expect(med.tipoMedida['k'] +" "+ med.tipoMedida['f'] +" "+ med.tipoMedida['c']).to.equal('Kelvin Fahrenheit Celsius');
    });
  });

  describe('#match', function() {
    it ('debería analizar la entrada y obtener el valor, unidad origen y unidad destino',function() {
      var med = new Medida(24);
      var aux = med.match("32c to k");
      expect(aux.value +" "+ aux.units +" "+ aux.units2).to.equal('32 c  k');
    });
  });

  describe('#calculate', function() {
    it("no deberia saber convertir de c a j (caso edge)", function(){
      expect(medida.calculate("32c","j")).to.equal("Desconozco como convertir desde "c" hasta "j" \n TypeError: source.toundefined is not a function");
    });

    it("deberia retornar un string", function(){
      expect(medida.calculate("32","c")).to.be.a("string");
    });

    it("32C k deberia ser 305.15K", function(){
      expect(medida.calculate("32c","k")).to.deep.equal('305.15K');
    });

    it("0C to fah deberia ser 32F",function(){
      expect(medida.calculate("0C to fah")).to.deep.equal('32F');
    });

    it("273.15Kelvin c deberia ser 0C",function(){

      expect(medida.calculate("273.15Kelvin c")).to.deep.equal('0C');
    });

    it("45Fa Fahrenheit deberia ser 45F",function(){
      expect(medida.calculate("45Fa Fahrenheit")).to.deep.equal('45F');
    });

    it("45w no se acepta",function(){
      expect(medida.calculate("45W")).to.deep.equal("Introduzca una temperatura valida: 330e-1 F to C");
    });

    it("tem43c no se acepta",function(){
      expect(medida.calculate("tem43c")).to.deep.equal("Introduzca una temperatura valida: 330e-1 F to C");
    });

    it("Espacios en blanco no importan.0     C to kel 273.15K",function() {
      expect(medida.calculate("0    C to kel")).to.deep.equal('273.15K');
    });

    it("Se acepta notacion cientifica. -1.2e-3 f Cels",function() {
      expect(medida.calculate("-1.2e-3 f Cels")).to.deep.equal("-17.778444444444442C");
    });
  });
});

describe('Temperatura', function() {
  describe('constructor', function() {
    it ('debería aceptar dos parámetros (valor, tipo)',function() {
      var tem = new Temperatura(24,'k');
      expect(tem.valor+tem.tipo).to.equal('24k');
    });
  });
});

describe('Celsius', function() {
  describe('constructor', function() {
    it ('debería aceptar un valor como parámetro,el tipo es celsius siempre',function() {
      var cel = new Celsius(24);
      expect(cel.valor+cel.tipo).to.equal('24C');
    });
  });

  describe('#toCelsius', function() {
    it ('debería devolver un objeto Celsius, en este caso a si mismo',function() {
      var cel = new Celsius(24);
      expect(cel.toCelsius()).to.equal(cel);
    });
  });

  describe('#toFahrenheit', function() {
    it ('debería devolver un objeto Fahrenheit convertido',function() {
      var cel = new Celsius(24);
      var fah = new Fahrenheit(75.2);
      expect(cel.toFahrenheit()).to.deep.equal(fah);
    });
  });

  describe('#toKelvin', function() {
    it ('debería devolver un objeto Kelvin convertido',function() {
      var cel = new Celsius(24);
      var kel = new Kelvin(297.15);
      expect(cel.toKelvin()).to.deep.equal(kel);
    });
  });
});

describe('Fahrenheit', function() {
  describe('constructor', function() {
    it ('debería aceptar un valor como parámetro,el tipo es fahrenheit siempre',function() {
      var fah = new Fahrenheit(75.2);
      expect(fah.valor+fah.tipo).to.equal('75.2F');
    });
  });

  describe('#toCelsius', function() {
    it ('debería devolver un objeto Celsius convertido',function() {
      var fah = new Fahrenheit(75.2);
      var cel = new Celsius(24);
      expect(fah.toCelsius()).to.deep.equal(cel);
    });
  });

  describe('#toFahrenheit', function() {
    it ('debería devolver un objeto Fahrenheit, en este caso es a si mismo',function() {
      var fah = new Fahrenheit(75.2);
      expect(fah.toFahrenheit()).to.deep.equal(fah);
    });
  });

  describe('#toKelvin', function() {
    it ('debería devolver un objeto Kelvin convertido',function() {
      var fah = new Fahrenheit(75.2);
      var kel = new Kelvin(297.15);
      expect(fah.toKelvin()).to.deep.equal(kel);
    });
  });
});

describe('Kelvin', function() {
  describe('constructor', function() {
    it ('debería aceptar un valor como parámetro,el tipo es fahrenheit siempre',function() {
      var kel = new Kelvin(297.15);
      expect(kel.valor+kel.tipo).to.equal('297.15K');
    });
  });

  describe('#toCelsius', function() {
    it ('debería devolver un objeto Celsius convertido',function() {
      var kel = new Kelvin(297.15);
      var cel = new Celsius(24);
      expect(kel.toCelsius()).to.deep.equal(cel);
    });
  });

  describe('#toFahrenheit', function() {
    it ('debería devolver un objeto Fahrenheit convertido',function() {
      var kel = new Kelvin(297.15);
      var fah = new Fahrenheit(75.19999999999999);
      expect(kel.toFahrenheit()).to.deep.equal(fah);
    });
  });

  describe('#toKelvin', function() {
    it ('debería devolver un objeto Kelvin , en este caso es a si mismo',function() {
      var kel = new Kelvin(297.15);
      expect(kel.toKelvin()).to.deep.equal(kel);
    });
  });
});
