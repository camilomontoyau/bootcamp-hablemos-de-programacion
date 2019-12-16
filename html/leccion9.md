# Lección 9: La etiqueta header


La función de la etiqueta `<header>` es representar contenido introductorio o un conjunto de links navegables

### Un etiqueta header típicamente puede contener:

- uno o mas elementos de encabezado (<h1> - <h6>)
- logos o íconos
- Información del autor de la página


Puedes crear varios elementos header en el mismo documento html

Crea un archivo ejemplo9.html y pega el siguiente código en él:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <main>
    <h1>Bienvenidos a mi primera página</h1>
    <h2>Mi nombre es</h2>
    <p> Camilo Montoya</p>
  </main>
  <header>
  <h3>Acerca de mi:</h3>
  <p>Soy desarrollador de software, me gradué de ingeniería de sistemas hace algunos años, llevo trabajando como desarrollador desde el 2006, pero la primera vez que hice código, fue en 1999 cuando estaba en octavo grado, es decir hace 20 años que programo</p>
  </header>

  <header>
  <p>Camilo es una persona que trabaja en la industria del software</p>

  <p>Le encanta el lenguaje javascript y su framework frontend favorito es vueJS</p>
  </header>
</body>
</html>
```

Nota que así como `<main>`, la etiqueta `<header>` no genera modificaciones visuales, pero estructuralmente le estás dando una mejor semántica a tu documento html, y esto los buscadores como google o bing lo saben recompensar muy bien, porque le estás dando jerarquía a tu documento.

[Vamos a la lección número 10 de este tutorial >>>](leccion10.md)