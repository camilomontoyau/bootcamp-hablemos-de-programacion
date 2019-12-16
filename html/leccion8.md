# Lección 8: html5


Como vimos anteriormente html es definido por un estándar, al cual, se le han agregado nuevas etiquetas y elementos

Las etiquetas main, header, footer, nav, video, article, section, entre otras fueron agregadas en la versión 5 de la especificación


La etiqueta `<main>` ayuda a los motores de busqueda a detectar el contenido principal de tu página, es decir, aquel contenido que quieres que los buscadores indexen como principal, debería estar rodeado por esta etiqueta

Crea un archivo ejemplo8.html

pega el siguiente código en él:

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
  <h3>Acerca de mi:</h3>
  <p>Soy desarrollador de software, me gradué de ingeniería de sistemas hace algunos años, llevo trabajando como desarrollador desde el 2006, pero la primera vez que hice código, fue en 1999 cuando estaba en octavo grado, es decir hace 20 años que programo</p>
</body>
</html>
```

Una vez abras el archivo en un navegador, vas a notar que visualmente el código no cambia, pero esto no significa que estructuralmente no cambie, para los robots del buscador de google esto será genial porque les estás facilitando el trabajo!


[Vamos a la lección número 9 de este tutorial >>>](leccion9.md)