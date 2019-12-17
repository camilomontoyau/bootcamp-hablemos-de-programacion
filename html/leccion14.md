# Lección 14: Revisemos otros atributos de la etiqueta anchor `<a>`


¿Te diste cuenta que usamos el atributo `href` de `<a>` ?

En ese atributo ponemos la dirección web de las páginas u otros documentos html a los cuales queremos enlazar nuestra página.

Sin embargo, no queremos que nuestros visitantes abandonen nuestra página cuando den click en uno de sus enlaces. Para evitar eso, vamos a usar el atributo `target`

crea un archivo ejemplo14.html y pega el código que te compartiremos a continuación:

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

  <a target="_blank" href="https://www.facebook.com/camilomontoyau">
    <img width="100" src="https://scontent.feoh4-1.fna.fbcdn.net/v/t1.0-9/58599145_826727507691617_8858138235730132992_n.jpg?_nc_cat=105&_nc_ohc=bqQiPFMFa_EAQkX4b5OvM6f_brs0hRhdmLorXD1cVWLbdUB1VB-XEpMOQ&_nc_ht=scontent.feoh4-1.fna&oh=1c3f09ec0c524d21acc26c24e13fa359&oe=5E7C0F0F" />
  </a>
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

Ahora da click nuevamente en la imagen de tu página.

¿Notaste la diferencia? 

El atributo `target="_blank"` le dice al navegador que abra el vínculo en una nueva pestaña.

[Vamos a la lección número 15 de este tutorial >>>](leccion15.md)