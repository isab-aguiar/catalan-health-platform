import erikaPhoto from "../assets/images/acs-erika.png";
import enesJuniorPhoto from "../assets/images/acs-enesjunior.png";
import renataPhoto from "../assets/images/acs-renata.png";
import wasleyPhoto from "../assets/images/acs-waslei.png";
import danielPhoto from "../assets/images/acs-daniel.png";
import daviPhoto from "../assets/images/acs-davi.png";
export const microareasData = {
  "ESF CATALÃO": {
    medico: "Dr. Frederico",
    enfermeira: "Enf. Aline Macedo",
    dentista: "Dra. Helena",
    asb: "Maycon",
    microareas: [
      {
        numero: "01",
        acs: "Wasley",
        photo: wasleyPhoto,
        ruas: [
          { nome: "Vila João Cota", numeros: "01 até 130" },
          { nome: "Vila Daldegan", numeros: "108 até 186" },
          { nome: "São José", numeros: "16 até 99" },
          { nome: "São Geraldo", numeros: "10 até 81" },
          { nome: "Nossa Senhora Aparecida", numeros: "40 até 212" },
          { nome: "Vila Esperança", numeros: "20 até 102" },
          { nome: "Júlio Nogueira", numeros: "128 até 188 + 305" },
          { nome: "Anita Garibaldi", numeros: "20 até 168 (somente lado par)" },
          { nome: "Viriato Corrêa", numeros: "30 até 263" },
          {
            nome: "Avenida Amazonas",
            numeros: "25 até 131 (somente lado ímpar)",
          },
          {
            nome: "Avenida Contorno",
            numeros: "12 até 288 + 469 (somente lado par)",
          },
        ],
      },
      {
        numero: "02",
        acs: "Ênes Júnior",
        photo: enesJuniorPhoto,
        ruas: [
          {
            nome: "Avenida Amazonas",
            numeros:
              "135, 137, 169, 227, 237, 239, 245, 251, 261, 293, 295, 311, 315, 325, 337, 337F, 345, 347, 419, 421, 429, 439, 443, 467, 471, 497, 497F, 513, 519, 521, 523",
          },
          { nome: "Afonsina", numeros: "7 até 220" },
          { nome: "Almirante Barroso", numeros: "8 até 51" },
          { nome: "Almirante Tamandaré", numeros: "230 até 280" },
          {
            nome: "Anita Garibaldi",
            numeros:
              "11, 31, 33, 35, 37, 49, 55, 61, 63, 83, 125, 133, 135, 147, 159, 175",
          },
          { nome: "Duque de Caxias", numeros: "13 até 78" },
          {
            nome: "Júlio Nogueira",
            numeros: "8, 29, 49, 69, 200 até 540 (somente PAR)",
          },
          { nome: "Marcílio Dias", numeros: "10 até 239" },
          {
            nome: "Marquês de Olinda",
            numeros:
              "11, 21, 25, 31, 35, 36, 44, 100, 160, 200, 201, 204, 210, 249, 251, 255F, 261, 280, 290, 290F, 293, 295, 296, 297, 300, 305, 310",
          },
          {
            nome: "Tuiti",
            numeros:
              "71, 77, 79, 83, 89, 93, 93F, 100, 106, 115, 116, 123, 133 (a.b), 143, 153, 153F, 167, 177, 179, 190A, 203, 205, 206, 210, 216, 218, 221, 222, 223, 225, 233, 234, 236, 240, 254",
          },
          { nome: "José de Alencar", numeros: "124 até 372" },
          {
            nome: "Vereador Elizeu Zica",
            numeros:
              "36, 127, 139, 140, 145, 149, 150, 156, 159, 160, 170, 177, 178, 191, 193, 199, 200, 204, 206, 210, 223, 235, 240, 241, 260, 269, 270, 274, 277, 305, 321, 327, 330, 362, 372, 376, 382",
          },
          { nome: "Travessa Almirante Barroso", numeros: "116 até 218" },
        ],
      },
      {
        numero: "03",
        acs: "Erika",
        photo: erikaPhoto,
        ruas: [
          {
            nome: "Avenida Contorno",
            numeros: "713, 723, 743, 63, 67, 77, 147, 199, 02",
          },
          { nome: "Duarte", numeros: "ímpar 11 até 225 / par 40 até 170" },
          { nome: "Nossa Senhora Aparecida", numeros: "348 até 801" },
          { nome: "Anita Garibaldi", numeros: "241 até 660" },
          {
            nome: "Avenida Amazonas",
            numeros: "2 até 210 somente par (+ 129, 139)",
          },
          { nome: "Castro Alves", numeros: "255 até 524" },
          { nome: "Avenida Paraná", numeros: "17 até 444" },
          { nome: "Afrânio Peixoto", numeros: "23 até 374" },
          { nome: "Fagundes Varela", numeros: "154 até 424" },
          { nome: "Rio Grande do Norte", numeros: "1550 (apenas)" },
          { nome: "Avenida Autorama", numeros: "441, 283, 281, 161" },
        ],
      },
      {
        numero: "04",
        acs: "Área Descoberta (atendida por Dr. Frederico e Enf. Aline Macedo)",
        ruas: [
          { nome: "Duque de Caxias", numeros: "110 até 741" },
          { nome: "Vereador Elizeu Zica", numeros: "155 + 388 até 801" },
          {
            nome: "Beco Elizeu Zica",
            numeros: "239, 253, 263, 283, 283B, 293",
          },
          {
            nome: "Travessa Elizeu Zica",
            numeros: "14, 16, 21, 26, 29, 36, 36fds, 35, 49, 291",
          },
          { nome: "Fagundes Varela", numeros: "430 até 560" },
          { nome: "Almirante Barroso", numeros: "98 até 478" },
          { nome: "Afrânio Peixoto", numeros: "418 até 607" },
          { nome: "Avenida Paraná", numeros: "466 até 540F" },
          { nome: "Castro Alves", numeros: "530 até 660" },
          { nome: "Avenida Amazonas", numeros: "228 até 384 (somente par)" },
        ],
      },
      {
        numero: "05",
        acs: "Área Descoberta (atendida por Dr. Frederico e Enf. Aline Macedo)",
        ruas: [
          { nome: "Marquês de Olinda", numeros: "329 até 820" },
          { nome: "Castro Alves", numeros: "721 até 1045" },
          { nome: "Avenida Paraná", numeros: "550 até 890" },
          { nome: "Afrânio Peixoto", numeros: "600 até 920" },
          { nome: "Geraldo Serrano", numeros: "777 até 987" },
          { nome: "Fagundes Varela", numeros: "600 até 950" },
          { nome: "Coronel Bragança", numeros: "481 até 889" },
          { nome: "Avenida Autorama", numeros: "501 até 751" },
          { nome: "Avenida Amazonas", numeros: "390 até 740 (somente par)" },
          { nome: "Joaquim Januário", numeros: "300 até 785" },
          { nome: "Cataguases", numeros: "220 até 710" },
          { nome: "Almirante Tamandaré", numeros: "351 até 706" },
        ],
      },
    ],
  },
  "ESF BELA VISTA": {
    medico: "Dr. Gustavo",
    enfermeira: "Enf. Naiara",
    dentista: "Dra. Helena",
    asb: "Maycon",
    microareas: [
      {
        numero: "01",
        acs: "Davi de Castro",
        photo: daviPhoto,
        ruas: [
          { nome: "Guapé", numeros: "180 até 1030 (somente pares)" },
          { nome: "Muriaé", numeros: "ímpar 57 até 1351 / par 30 até 1010" },
          { nome: "Medina", numeros: "ímpar 31 até 907 / par 70 até 846" },
          { nome: "Candeias", numeros: "ímpar 81 até 921 / par 900" },
          {
            nome: "Avenida Catalão",
            numeros: "ímpar 475 até 655 / par 450 até 662",
          },
          {
            nome: "Avenida Amazonas",
            numeros: "ímpar 1891 até 2985 / par 2756 até 2980",
          },
          {
            nome: "Castro Alves",
            numeros: "ímpar 2331 até 2491 / par 2242 até 2510",
          },
          {
            nome: "Júlio Nogueira",
            numeros: "ímpar 2331 até 2561 / par 2320 até 2570",
          },
          {
            nome: "Afrânio Peixoto",
            numeros: "2211 (Residencial Parque Belvedere)",
          },
          {
            nome: "Viriato Corrêa",
            numeros:
              "par 2050 até 2248 (exceto: 2220, 2190, 2180, 2170, 2125, 2121)",
          },
          {
            nome: "José de Alencar",
            numeros: "ímpar 2237 até 2501 / par 2380 até 2480",
          },
          { nome: "Graça Aranha", numeros: "2110 até 2261" },
          {
            nome: "Machado de Assis",
            numeros: "ímpar até 2331 / par 2190 até 2330",
          },
          { nome: "Monteiro Lobato", numeros: "251 até 391" },
          { nome: "Vitor Rogerio", numeros: "ímpar 251 até 265 / par 250" },
          {
            nome: "Padre Mariano",
            numeros: "ímpar 131 até 291 / par 12 até 264",
          },
          {
            nome: "Cornélia Silva",
            numeros: "ímpar 21 até 121 / par 10 até 180",
          },
          {
            nome: "Padre João Bruno",
            numeros: "ímpar 51 até 105 / par 40 até 90",
          },
          { nome: "Avenida Martin Cyprien", numeros: "100" },
          {
            nome: "São João Del Rei",
            numeros: "ímpar 603 até 977 / par 750 até 1100 (próximo à copasa)",
          },
          {
            nome: "Januário de Souza Rocha",
            numeros: "ímpar 11 até 173 / par 40 até 192",
          },
          { nome: "Lavras", numeros: "ímpar 1651 até 1751 (próximo à copasa)" },
          { nome: "Campo Verde", numeros: "30 até 120" },
          {
            nome: "Francisco Sales Marques",
            numeros: "ímpar 11 até 91 / par 60 até 80",
          },
          {
            nome: "Olímpio Meireles",
            numeros: "ímpar 21 até 161 / par 20 até 160",
          },
          { nome: "Maringá", numeros: "ímpar 211 até 331 / par 200 até 330" },
          { nome: "Antônio Alípio", numeros: "10 até 100 (somente par)" },
        ],
      },
      {
        numero: "02",
        acs: "Área Descoberta (atendida por Dr. Gustavo e Enf. Naiara)",
        ruas: [
          { nome: "José de Alencar", numeros: "1041 até 2076" },
          { nome: "Júlio Nogueira", numeros: "1209 até 2230" },
          { nome: "Viriato Corrêa", numeros: "1140 até 2220" },
          { nome: "Lavras", numeros: "830 e 860" },
          { nome: "Graça Aranha", numeros: "460 até 750" },
          { nome: "Marechal Castelo Branco", numeros: "30 até 300" },
          { nome: "José Lourenço", numeros: "311 até 501" },
          { nome: "Campo do Meio", numeros: "256 até 490" },
          { nome: "Carbonita", numeros: "492 até 641" },
          { nome: "Campo Florido", numeros: "331 até 411" },
          { nome: "Praça Elizeu Zica", numeros: "305, 307" },
          { nome: "Cascalho Rico", numeros: "25 até 361 (somente ímpar)" },
          {
            nome: "Avenida Amazonas",
            numeros: "1109 até 1731 (somente ímpar)",
          },
          { nome: "Campina Verde", numeros: "109 até 304" },
          {
            nome: "Campos Gerais",
            numeros: "entre Graça Aranha e Av. Amazonas",
          },
          { nome: "Capelinha", numeros: "290 até 470" },
          { nome: "Camacho", numeros: "369 até 400" },
        ],
      },
      {
        numero: "03",
        acs: "Renata Coimbra",
        photo: renataPhoto,
        ruas: [
          { nome: "Caratinga", numeros: "11 até 287 (somente ímpar) + 738" },
          { nome: "Canápolis", numeros: "31 até 311" },
          {
            nome: "Capinópolis",
            numeros: "11 até 331 (exceto 151, 153, 155, 156, 157)",
          },
          { nome: "Capetinga", numeros: "13 até 260" },
          { nome: "Cascalho Rico", numeros: "30 até 300 (somente par)" },
          { nome: "Avenida Amazonas", numeros: "765 até 1039 (somente ímpar)" },
          { nome: "Júlio Nogueira", numeros: "769 até 831" },
          { nome: "José de Alencar", numeros: "777 até 1020" },
          { nome: "Viriato Corrêa", numeros: "920 até 1121" },
          { nome: "Graça Aranha", numeros: "169 até 451" },
          { nome: "Lavras", numeros: "440 até 740 (somente par)" },
        ],
      },
      {
        numero: "04",
        acs: "Área Descoberta (atendida por Dr. Gustavo e Enf. Naiara)",
        ruas: [
          {
            nome: "José de Alencar",
            numeros: "ímpar 401 até 767 / par 406 até 612",
          },
          {
            nome: "Júlio Nogueira",
            numeros: "ímpar 429 até 715 / par 562 até 700",
          },
          {
            nome: "Viriato Corrêa",
            numeros: "ímpar 279 até 911 / par 890 até 910",
          },
          {
            nome: "Graça Aranha",
            numeros: "ímpar 825 até 845 / par 610 até 850 + 40",
          },
          { nome: "Cataguases", numeros: "ímpar 7 até 181 / par 10 até 400" },
          {
            nome: "Vereador Elizeu Zica",
            numeros: "139 até 315 (somente ímpar)",
          },
          {
            nome: "Almirante Tamandaré",
            numeros: "ímpar 21 até 174 / par 74 até 350",
          },
          { nome: "Tuiti", numeros: "ímpar 71 até 281 / par 240 até 306" },
          {
            nome: "Ouvidor",
            numeros: "ímpar 57 até 501 / par 16 até 366 + 400",
          },
          {
            nome: "Joaquim Januário",
            numeros: "ímpar 175 até 275 / par 40 até 284",
          },
          {
            nome: "Marquês de Olinda",
            numeros: "ímpar 11 até 255 / par 36 até 210",
          },
          { nome: "Avenida Amazonas", numeros: "553 até 711 (somente ímpar)" },
          { nome: "Caratinga", numeros: "40 a 2" },
        ],
      },
    ],
  },
  "ESF SÃO JOSÉ": {
    medico: "Dr. João",
    enfermeira: "Enf. Fabíola",
    dentista: "Dra. Mayra",
    asb: "Cibele",
    microareas: [
      {
        numero: "01",
        acs: "Matheus",
        ruas: [
          { nome: "Avenida Amazonas", numeros: "776 até 926 (somente par)" },
          {
            nome: "Avenida Paraná",
            numeros: "ímpar 925 até 1221 / par 910 até 1208",
          },
          {
            nome: "Afrânio Peixoto",
            numeros: "ímpar 931 até 1201 / par 1000 até 1280",
          },
          { nome: "Canápolis", numeros: "ímpar 391 até 891 / par 400 até 760" },
          { nome: "Capetinga", numeros: "546 até 1084 (somente lado par)" },
          {
            nome: "Capinópolis",
            numeros:
              "89, 99, 112, 123, 133, 143, 149, 151, 153, 156, 157, 347, 351, 371, 374, 384, 394, 438 / ímpar: 533 até 755 / par: 522 até 780",
          },
          { nome: "Caratinga", numeros: "327 até 891 (somente ímpar)" },
          {
            nome: "Castro Alves",
            numeros: "ímpar 1065 até 1247 / par 1070 até 1264",
          },
          {
            nome: "Coronel Bragança",
            numeros: "ímpar 1149 até 1249 / par 1200 até 1238",
          },
          {
            nome: "Fagundes Varela",
            numeros: "ímpar 971 até 1329 / par 970 até 1310",
          },
          {
            nome: "Geraldo Serrano",
            numeros: "ímpar 971 até 1155 / par 998 até 1170",
          },
        ],
      },
      {
        numero: "02",
        acs: "Área Descoberta (atendida por Dr. João e Enf. Fabíola)",
        ruas: [
          { nome: "Capetinga", numeros: "589 até 1091 (somente ímpar)" },
          { nome: "Cascalho Rico", numeros: "391 até 951" },
          {
            nome: "Marechal Castelo Branco",
            numeros: "318 até 1280 (somente par)",
          },
          { nome: "Gustavo Corsão", numeros: "241 até 291" },
          { nome: "Manoel Bandeira", numeros: "796 até 1251" },
          { nome: "Érico Veríssimo", numeros: "1475 até 1496" },
          { nome: "Coronel Bragança", numeros: "1222 até 1341" },
          {
            nome: "Geraldo Serrano",
            numeros: "ímpar 1195 até 1275 / par 1188 até 1258",
          },
          { nome: "Fagundes Varela", numeros: "1371 até 1486" },
          {
            nome: "Afrânio Peixoto",
            numeros: "ímpar 1285 até 1377 / par 1290 até 1384",
          },
          { nome: "Avenida Paraná", numeros: "1218 até 1286" },
          { nome: "Castro Alves", numeros: "1275 até 1354" },
          { nome: "Avenida Amazonas", numeros: "866 até 1264 (somente par)" },
        ],
      },
      {
        numero: "03",
        acs: "Área Descoberta (atendida por Dr. João e Enf. Fabíola)",
        ruas: [
          {
            nome: "Marechal Castelo Branco",
            numeros: "330 até 1295 (somente ímpar)",
          },
          { nome: "Afrânio Peixoto", numeros: "1401 até 1531" },
          { nome: "Avenida Amazonas", numeros: "876 até 1375" },
          { nome: "Campina Verde", numeros: "344 até 870 (somente par)" },
          { nome: "Campo Florido", numeros: "450 até 1251" },
          {
            nome: "Castro Alves",
            numeros: "ímpar 1375 até 1425 / par 1374 até 1444",
          },
          { nome: "Coronel Bragança", numeros: "1261 até 1401" },
          { nome: "Érico Veríssimo", numeros: "1041 até 1612" },
          { nome: "Fagundes Varela", numeros: "1500 até 1572" },
          { nome: "Geraldo Serrano", numeros: "1300 até 1455" },
          { nome: "Gustavo Corsão", numeros: "300 até 535" },
          { nome: "Avenida Paraná", numeros: "1286 até 1431" },
        ],
      },
      {
        numero: "04",
        acs: "Daniel",
        photo: danielPhoto,
        ruas: [
          { nome: "Campina Verde", numeros: "333 até 911 (somente ímpar)" },
          { nome: "Campo do Meio", numeros: "500 até 1101" },
          { nome: "Avenida Amazonas", numeros: "1254 até 1400 (somente par)" },
          { nome: "Castro Alves", numeros: "1618 até 1705" },
          { nome: "Afrânio Peixoto", numeros: "1541 até 1692" },
          { nome: "Fagundes Varela", numeros: "1561 até 1742" },
          { nome: "Geraldo Serrano", numeros: "1475 até 1605" },
          { nome: "Coronel Bragança", numeros: "1515 até 1660" },
          { nome: "Érico Veríssimo", numeros: "1576 até 1746" },
          { nome: "Manoel Bandeira", numeros: "1635 até 1820" },
          { nome: "Gustavo Corsão", numeros: "552 até 601" },
          { nome: "Raimundo Correa", numeros: "535 até 551" },
          { nome: "Avenida Paraná", numeros: "1486 até 1600" },
        ],
      },
    ],
  },
  "ESF SÃO JUDAS": {
    medico: "Dr. Lúcio",
    enfermeira: "Enf. Jéssica Barros",
    dentista: "Dra. Helena",
    asb: "Maycon",
    observacao:
      "Pertence UBS Morada Nova - Endereço: Castro Alves, 2085 - Tel: 3229-6086",
    microareas: [
      {
        numero: "01",
        acs: "Isabel",
        ruas: [
          { nome: "Camacho", numeros: "ímpar 429 até 1381 / par 430 até 1410" },
          { nome: "Avenida Amazonas", numeros: "1580 até 1640 (somente par)" },
          {
            nome: "Geraldo Serrano",
            numeros: "ímpar 1645 até 1761 / par 1650 até 1790",
          },
          {
            nome: "Érico Veríssimo",
            numeros: "ímpar 1861 até 1961 / par 1850 até 1970",
          },
          { nome: "Capelinha", numeros: "540 até 1220 (somente par)" },
          {
            nome: "Euclides da Cunha",
            numeros: "ímpar 321 até 353 / par 310 até 340",
          },
          {
            nome: "Cruz e Souza",
            numeros: "ímpar 491 até 611 / par 510 até 610",
          },
          {
            nome: "Raimundo Correa",
            numeros: "ímpar 571 até 689 / par 570 até 670",
          },
          {
            nome: "Manoel Bandeira",
            numeros: "ímpar 1851 até 1931 / par 1336 até 1940",
          },
          {
            nome: "Gustavo Corsão",
            numeros: "ímpar 621 até 691 / par 620 até 704",
          },
          {
            nome: "Castro Alves",
            numeros: "ímpar 1721 até 1965 / par 1750 até 1978",
          },
          {
            nome: "Afrânio Peixoto",
            numeros: "ímpar 1711 até 1855 / par 1710 até 1926",
          },
          {
            nome: "Fagundes Varela",
            numeros: "ímpar 1765 até 1871 / par 1770 até 1860",
          },
          {
            nome: "Coronel Bragança",
            numeros: "ímpar 1791 até 1807 / par 1710 até 1816",
          },
          {
            nome: "Avenida Paraná",
            numeros: "ímpar 1691 até 1731 / par 1650 até 1762",
          },
          {
            nome: "Campos Gerais",
            numeros: "427 até 1025 (ímpar) / 440 até 1030 (par)",
          },
        ],
      },
      {
        numero: "02",
        acs: "Amanda",
        ruas: [
          {
            nome: "Cecília Meireles",
            numeros: "ímpar 275 até 391 / par 280 até 400",
          },
          {
            nome: "Vinicius de Morais",
            numeros: "ímpar 381 até 461 / par 350 até 460",
          },
          {
            nome: "Euclides da Cunha",
            numeros: "ímpar 421 até 451 / par 420 até 460",
          },
          {
            nome: "Cruz e Souza",
            numeros: "ímpar 623 até 703 / par 622 até 680",
          },
          {
            nome: "Raimundo Correa",
            numeros: "ímpar 719 até 801 / par 684 até 804",
          },
          {
            nome: "Gustavo Corsão",
            numeros: "ímpar 731 até 821 / par 730 até 830",
          },
          {
            nome: "Manoel Bandeira",
            numeros: "ímpar 1971 até 2055 / par 1976 até 2050",
          },
          {
            nome: "Érico Veríssimo",
            numeros: "ímpar 2001 até 2071 / par 1990 até 2090",
          },
          {
            nome: "Coronel Bragança",
            numeros: "ímpar 1861 até 2131 / par 1850 até 2140",
          },
          {
            nome: "Geraldo Serrano",
            numeros: "ímpar 1841 até 2011 / par 1820 até 2040",
          },
          {
            nome: "Fagundes Varela",
            numeros: "ímpar 1911 até 1951 / par 1922 até 2012",
          },
          {
            nome: "Afrânio Peixoto",
            numeros: "ímpar 1891 até 1991 / par 1850 até 1972",
          },
          {
            nome: "Avenida Paraná",
            numeros: "ímpar 1777 até 1889 / par 1790 até 1870",
          },
          {
            nome: "Castro Alves",
            numeros: "ímpar 2081 até 2085 / par 1990 a 2100",
          },
          { nome: "Avenida Amazonas", numeros: "1650 até 1760 (somente par)" },
          { nome: "Capelinha", numeros: "531 até 1261 (somente ímpar)" },
          { nome: "Carbonita", numeros: "ímpar 651 até 1310" },
          { nome: "José Lourenço", numeros: "540 até 1460 (somente par)" },
        ],
      },
      {
        numero: "03",
        acs: "Izabelle",
        ruas: [
          { nome: "José Lourenço", numeros: "511 até 1515 (somente ímpar)" },
          {
            nome: "Campo Belo",
            numeros: "ímpar 751 até 1621 / par 760 até 1620",
          },
          {
            nome: "Candeias",
            numeros: "ímpar 961 até 1461 / par 960 até 1460",
          },
          { nome: "Medina", numeros: "1070 até 1470 (somente par)" },
          {
            nome: "Castro Alves",
            numeros: "ímpar 2201 até 2381 / par 2146 até 2390",
          },
          {
            nome: "Avenida Paraná",
            numeros: "ímpar 1909 até 2421 / par 1932 até 2400",
          },
          {
            nome: "Afrânio Peixoto",
            numeros: "ímpar 2021 até 2141 / par 2050 até 2200",
          },
          {
            nome: "Fagundes Varela",
            numeros: "ímpar 2071 até 2231 / par 2060 até 2130",
          },
          {
            nome: "Geraldo Serrano",
            numeros: "ímpar 2149 até 2261 / par 2060 até 2250",
          },
          {
            nome: "Coronel Bragança",
            numeros: "ímpar 2149 até 2261 / par 2150 até 2242",
          },
          {
            nome: "Érico Veríssimo",
            numeros: "ímpar 2101 até 2231 / par 2100 até 2230",
          },
          {
            nome: "Manoel Bandeira",
            numeros: "ímpar 2061 até 2361 / par 2060 até 2230",
          },
          {
            nome: "Cecília Meireles",
            numeros: "ímpar 417 até 461 / par 410 até 450",
          },
          {
            nome: "Raimundo Corrêa",
            numeros: "ímpar 829 até 1001 / par 814 até 980",
          },
          {
            nome: "Gustavo Corsão",
            numeros: "ímpar 841 até 1001 / par 838 até 1000",
          },
          {
            nome: "Cruz e Souza",
            numeros: "ímpar 721 até 711F / par 710 até 830",
          },
          {
            nome: "Euclides da Cunha",
            numeros: "ímpar 481 até 571 / par 480 até 830",
          },
          {
            nome: "Vinicius de Moraes",
            numeros: "ímpar 481 até 601 / par 470 até 570",
          },
        ],
      },
    ],
  },
  "ESF SÃO JUDAS (MIGRADA)": {
    medico: null,
    enfermeira: null,
    dentista: null,
    asb: null,
    migrada: true,
    novoLocal: {
      esf: "ESF Morada Nova",
      telefone: "(37) 3229-XXXX",
      endereco:
        "Rua Principal da Morada Nova, XXX - Bairro Morada Nova, Divinópolis/MG",
      observacao:
        "Para receber atendimento pela nova ESF, é necessário atualizar seu cadastro presencialmente.",
    },
    microareas: [
      {
        numero: "01",
        acs: "Área Transferida - Comparecer à ESF Morada Nova",
        ruas: [],
      },
    ],
  },
};
import { normalize } from "../utils/normalize.js";
import { parseNumberRange } from "../utils/rangeParser.js";
function buildStreetsIndex(data) {
  const index = [];
  Object.entries(data).forEach(([esfName, esfData]) => {
    esfData.microareas.forEach((microarea) => {
      microarea.ruas.forEach((rua) => {
        index.push({
          street: rua.nome,
          streetNormalized: normalize(rua.nome),
          numberRange: rua.numeros,
          rangeData: parseNumberRange(rua.numeros),
          esf: esfName,
          microarea: microarea.numero,
          acs: microarea.acs,
          medico: esfData.medico,
          enfermeira: esfData.enfermeira,
          dentista: esfData.dentista,
          asb: esfData.asb,
          observacao: esfData.observacao || null,
          bio: microarea.bio || null,
          photo: microarea.photo || null,
          migrada: esfData.migrada || false,
          novoLocal: esfData.novoLocal || null,
        });
      });
    });
  });
  return index;
}
export const streetsIndex = buildStreetsIndex(microareasData);
export { buildStreetsIndex };
