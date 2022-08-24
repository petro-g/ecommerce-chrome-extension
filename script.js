function copyToClipboard(text) {
  $("#input").val(text);
  $("#input").focus();
  $("#input").select();
  document.execCommand("copy");
}

function gera_random(n) {
  var ranNum = Math.round(Math.random()*n);
  return ranNum;
}

function mod(dividendo,divisor) {
  return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}

function ci_last_digit(document_ci) {
  var sum = 0;
  var multiple = 0;
  var mod = 0;

  for(var i=0; i < document_ci.length; i++) {
    pos_number = parseInt(document_ci[i]);

    if((i % 2 == 0)){
      multiple = pos_number * 2;
      sum += (multiple > 9) ? multiple - 9 : multiple;
    } else {
      sum += pos_number;
    }
  }

  mod = sum % 10;
  if (mod > 0) {
    mod = 10 - mod
  }

  return mod;
}

function dni(){
  var n1 = gera_random(9);
  var n2 = gera_random(9);
  var n3 = gera_random(9);
  var n4 = gera_random(9);
  var n5 = gera_random(9);
  var n6 = gera_random(9);
  var n7 = gera_random(9);
  var n8 = gera_random(9);

  return ''+n1+n2+n3+n4+n5+n6+n7+n8;
}

function cuit_dv(person_dni) {
  var sum  = 0;
  var digits = person_dni.split("");

  for(var i = 0; i < digits.length; i++) {
    sum += digits[9 - i] * (2 + (i % 6));
  }

  var verif = 11 - (sum % 11);
  if(verif == 11) {
    verif = 0;
  }

  return verif;
}

function cuit() {
  var prefixes = Array(20,23,24,27,23,24,30,33,34)

  var prefix = prefixes[Math.floor(Math.random()*prefixes.length)];
  var person_dni, dv;

  do {
    person_dni = ''+prefix+dni();
    dv = cuit_dv(person_dni)
  } while (dv == 10);

  return ''+person_dni+dv;
}

function ci(){
  var n1 = gera_random(9);
  var n2 = gera_random(9);
  var n3 = gera_random(5);
  var n4 = gera_random(9);
  var n5 = gera_random(9);
  var n6 = gera_random(9);
  var n7 = gera_random(9);
  var n8 = gera_random(9);
  var n9 = gera_random(9);

  var document_ci = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9;
  var document_ci_digit = ci_last_digit(document_ci);

  return document_ci + document_ci_digit;
}

function cpf(with_mask) {
  var n = 9;
  var n1 = gera_random(n);
  var n2 = gera_random(n);
  var n3 = gera_random(n);
  var n4 = gera_random(n);
  var n5 = gera_random(n);
  var n6 = gera_random(n);
  var n7 = gera_random(n);
  var n8 = gera_random(n);
  var n9 = gera_random(n);
  var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
  d1 = 11 - ( mod(d1,11) );
  if (d1>=10) d1 = 0;
  var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11; d2 = 11 - ( mod(d2,11) );
  if (d2>=10) d2 = 0;
  if (with_mask) {
    return ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
  } else {
    return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
  }
}

function cnpj(with_mask) {
  var n = 9;
  var n1 = gera_random(n);
  var n2 = gera_random(n);
  var n3 = gera_random(n);
  var n4 = gera_random(n);
  var n5 = gera_random(n);
  var n6 = gera_random(n);
  var n7 = gera_random(n);
  var n8 = gera_random(n);
  var n9 = 0;  //gera_random(n);
  var n10 = 0; //gera_random(n);
  var n11 = 0; //gera_random(n);
  var n12 = 1; //gera_random(n);
  var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
  d1 = 11 - ( mod(d1,11) );
  if (d1>=10) d1 = 0;
  var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6; d2 = 11 - ( mod(d2,11) );
  if (d2>=10) d2 = 0;
  if (with_mask) {
    return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
  } else {
    return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2;
  }
}

function lorem() {
  return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}

$(document).ready(function() {
  $('#instructions a').on("click", function(){
    console.log($(this).attr("id"));

    switch($(this).attr('id')) {
      case "cpf": // 1
        document.execCommand("copy")
        copyToClipboard(cpf(false));
        break;
      case "cpfm": // 2
        copyToClipboard(cpf(true));
        break;
      case "cnpj": // 3
        copyToClipboard(cnpj(false));
        break;
      case "cnpjm": // 4
        copyToClipboard(cnpj(true));
        break;
      case "lorem": // 5
        copyToClipboard(lorem());
        break;
      case "visa": // 6
        copyToClipboard(cc_gen('visa'));
        break;
      case "master": // 7
        copyToClipboard(cc_gen('master'));
        break;
      case "master": // 8
        copyToClipboard(cc_gen('amex'));
        break;
      case "amex": // 9
        copyToClipboard(cc_gen('discover'));
        break;
      case "ci": // 0
        copyToClipboard(ci());
        break;
      case "cuit": // 0
        copyToClipboard(cuit());
        break;
      case "dni": // 0
        copyToClipboard(dni());
        break;
    }
    window.close();
    }
  );

  $("body").keypress(function(event) {
    switch (event.which) {
      case 49: // 1
        document.execCommand("copy")
        copyToClipboard(cpf(false));
        break;
      case 50: // 2
        copyToClipboard(cpf(true));
        break;
      case 51: // 3
        copyToClipboard(cnpj(false));
        break;
      case 52: // 4
        copyToClipboard(cnpj(true));
        break;
      case 53: // 5
        copyToClipboard(lorem());
        break;
      case 54: // 6
        copyToClipboard(cc_gen('visa'));
        break;
      case 55: // 7
        copyToClipboard(cc_gen('master'));
        break;
      case 56: // 8
        copyToClipboard(cc_gen('amex'));
        break;
      case 57: // 9
        copyToClipboard(cc_gen('discover'));
        break;
      case 48: // 0
        copyToClipboard(ci());
        break;
      case 97: // 0
        copyToClipboard(cuit());
        break;
      case 115: // 0
        copyToClipboard(dni());
        break;
    }
    window.close();
  });
});

