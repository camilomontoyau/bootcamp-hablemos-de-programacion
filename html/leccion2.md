# Lección 2: Empecemos con la estructura principal de nuestra página

## HTML básico:

Vamos a crear nuestro primer documento html o mejor aún vamos a crear nuestra primera página web!

### 1) Para indicarle al navegador que el contenido de nuestro documento es html vamos a iniciar su escructura principal con el document type y la etiqueta html

En este paso vamos a crear en la carpeta ejemplos un archivo que se llame ejemplo2.html

y vamos a copiar el siguiente código en él:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

Si abres el anterior documento html en un navegador, sólo verás una página en blanco.


Vamos a ver que hemos hecho:

- hemos indicado al navegador que el contenido del archivo es html

```html
<!DOCTYPE>
```

- DOCTYPE en si no es una etiqueta HTML, es una instrucción al navegador web para indicarle que versión de html vamos a usar y esta instrucción debe ir antes que cualquier elemento html que queramos que nuestra página muestre.

- para html5 sólo basta con poner `<!DOCTYPE html>`

- para versiones anteriores a la versión 5 la instrucción es diferente

Ejemplos:

html 4.01 strict
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

html 4.01 transitional
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

html 4.01 frameset
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

### 2) Luego creamos nuestro elemento padre de todo el documento con el tag html

```html
<html></html>
```

### 3) Luego creamos el elemento head

```html
<html><head></head></html>
```

El elemento head, es un elemento de metadata (datos acerca de los datos), este elemento no es visual, debe estar ubicado en el medio de las etiquetas `<html>` de apertura y `<body>` de apertura.
Da información al navegador acerca de la estructura de nuestro documento web  

### 4) etiquetas meta

Cómo mencionamos anteriormente en que `<head>` entrega al navegador metada de la página, pues es normal que los elementos hijos de head hagan lo debido

#### 4.1) meta charset

```html
<meta charset="UTF-8">
```

la etiqueta meta con la propiedad charset indica al navegador que grupo de carácteres (letras) vamos a usar en nuestro documento, en este caso usamos UTF-8, el cual es el grupo que contiene la mayoría de carácteres usados en los idiomas del hemisferio occidental de nuestro planeta

#### 4.2) meta viewport y content

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

La etiqueta meta con la propiedad `name="viewport"` le dice al navegador cómo debe controlar las dimensiones, tamaños y escalabilidad del contenido de nuestro documento

La parte `width=device-width` en **content** le dice al navegador que debe configurar el ancho de la página al mismo ancho del dispositivo en donde la estamos visualizando (el cual dependerá de cada dispositivo).

La parte `initial-scale=1.0` le dice al navegador cuál es el nivel de zoom que debe tener la página cuando se carga por primera vez.

#### 4.3) meta http-equiv

```html
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```

El atributo `http-equiv` provee un encabezado en la petición HTTP con información del contenido

El valor `X-UA-Compatible` permitía a los creadores de páginas web en el pasado seleccionar en qué versión de  Internet Explorer la página se debía de mostrar.
Todos sabemos que microsoft no quizo seguir estándares hasta hace poco, y en mi opinión personal esto es un hack que actualmente ya no es necesario usar, sin embargo el autocompletador de código html de visual studio code lo agrega siempre.

### 5) etiqueta title

```html
<title>Document</title>
```

Esta etiqueta le dice al navegador qué texto debe mostrar en la barra de título de la pestaña.

### 6) etiqueta body

```html
<body>Acá va el contenido de nuestra página</body>
```

Tal cual lo que dice dentro de la etiqueta :point_up:

[Vamos a la lección número 3 de este tutorial >>>](leccion3.md)

