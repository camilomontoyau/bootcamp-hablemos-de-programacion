# Lección 12: Demos tamaño a la imagen

La etiquetas html tienen algo que se llama atributos o propiedades 
La etiqueta `<img>` por ejemplo tiene el atributo/propiedad width con este podemos darle tamaño a las imágenes, en este caso estaríamos dandole a la eqitqueta el ancho (en inglés **width**) de la imagen

de la siguiente manera

```html
<img width="100">
```

de este modo le estamos diciendo al navegador que muestre la imagen con un ancho de 100 píxeles y el alto de la imagen se modifica automáticamente para guardar las proporciones de la imagen

Creemos un archivo que se llame ejemplo12.html y peguemos el siguiente código

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

  <img width="100" src="https://scontent.feoh4-1.fna.fbcdn.net/v/t1.0-9/58599145_826727507691617_8858138235730132992_n.jpg?_nc_cat=105&_nc_ohc=bqQiPFMFa_EAQkX4b5OvM6f_brs0hRhdmLorXD1cVWLbdUB1VB-XEpMOQ&_nc_ht=scontent.feoh4-1.fna&oh=1c3f09ec0c524d21acc26c24e13fa359&oe=5E7C0F0F" />
  <header>
  <p>Camilo es una persona que trabaja en la industria del software</p>

  <p>Le encanta el lenguaje javascript y su framework frontend favorito es vueJS</p>
  </header>
  <p> Camilo está realizando un coding bootcamp online gratuito</p>

  <footer>
    Redes sociales de Camilo:
    <ul>
      <li>Twitter<a href="https://twitter.com/camilomontoyau">@camilomontoyau</a></li>
      <li>Instragram<a href="https://instagram.com/camilomontoyau">@camilomontoyau</a></li>
      <li>Facebook<a href="https://facebook.com/camilomontoyau">@camilomontoyau</a></li>
    </ul>

    <p>
      Email:
      <a href="mailto:camilomontoya2@gmail.com">
        camilomontoya2@gmail.com
      </a>
    </p>
    <p>
      Copyright 1999-2019 Camilo Montoya. Todos los derechos reservados.
    </p>
  </footer>
</body>
</html>
```

¿Notas algún cambio en la imagen?


[Vamos a la lección número 13 de este tutorial >>>](leccion13.md)