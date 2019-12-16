# Lección 2: Empecemos con la estructura principal de nuestra página

## HTML básico:

Vamos a crear nuestro primer documento html o mejor aún vamos a crear nuestra primera página web!

### 1) Para indicarle al navegador que el contenido de nuestro documento es html vamos a iniciar su escructura principal con el document type y la etiqueta html

En este paso vamos a crear en la carpeta ejemplos un archivo que se llame ejemplo2.html

y vamos a copiar el siguiente código en él:

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


